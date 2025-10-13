import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Gift, Share2, Trophy, Star, Sparkles, Copy, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const TIER_THRESHOLDS = {
  bronze: 0,
  silver: 1000,
  gold: 5000,
  platinum: 10000,
};

const TIER_BENEFITS = {
  bronze: { discount: 5, earnRate: 1 },
  silver: { discount: 10, earnRate: 1.5 },
  gold: { discount: 15, earnRate: 2 },
  platinum: { discount: 20, earnRate: 2.5 },
};

export const LoyaltyRewards = () => {
  const [loyaltyData, setLoyaltyData] = useState<any>(null);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [referralEmail, setReferralEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLoyaltyData();
    loadReferrals();
  }, []);

  const loadLoyaltyData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('loyalty_points')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (!data) {
        // Create initial loyalty record
        const { data: newData, error: insertError } = await supabase
          .from('loyalty_points')
          .insert([{
            user_id: user.id,
            points: 0,
            tier: 'bronze',
          }])
          .select()
          .single();

        if (insertError) throw insertError;
        setLoyaltyData(newData);
      } else {
        setLoyaltyData(data);
      }
    } catch (error) {
      console.error('Error loading loyalty data:', error);
      toast.error('Failed to load loyalty data');
    } finally {
      setLoading(false);
    }
  };

  const loadReferrals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReferrals(data || []);
    } catch (error) {
      console.error('Error loading referrals:', error);
    }
  };

  const sendReferral = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to send referrals');
        return;
      }

      if (!referralEmail) {
        toast.error('Please enter an email');
        return;
      }

      const { error } = await supabase.from('referrals').insert([{
        referrer_id: user.id,
        referee_email: referralEmail,
        status: 'pending',
      }]);

      if (error) throw error;

      toast.success('Referral sent! You\'ll earn 500 points when they make their first purchase.');
      setReferralEmail('');
      loadReferrals();
    } catch (error) {
      console.error('Error sending referral:', error);
      toast.error('Failed to send referral');
    }
  };

  const copyReferralLink = () => {
    const link = `${window.location.origin}?ref=${loyaltyData?.user_id}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success('Referral link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const getTierProgress = () => {
    if (!loyaltyData) return 0;
    const currentTier = loyaltyData.tier;
    const tiers = Object.keys(TIER_THRESHOLDS);
    const currentIndex = tiers.indexOf(currentTier);
    const nextTier = tiers[currentIndex + 1];
    
    if (!nextTier) return 100;
    
    const currentThreshold = TIER_THRESHOLDS[currentTier as keyof typeof TIER_THRESHOLDS];
    const nextThreshold = TIER_THRESHOLDS[nextTier as keyof typeof TIER_THRESHOLDS];
    const progress = ((loyaltyData.points - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    
    return Math.min(100, Math.max(0, progress));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const tier = loyaltyData?.tier || 'bronze';
  const benefits = TIER_BENEFITS[tier as keyof typeof TIER_BENEFITS];
  const progress = getTierProgress();
  const tiers = Object.keys(TIER_THRESHOLDS);
  const currentIndex = tiers.indexOf(tier);
  const nextTier = tiers[currentIndex + 1];

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif font-bold mb-2">Loyalty & Rewards</h1>
        <p className="text-muted-foreground">Earn points, unlock exclusive benefits</p>
      </div>

      {/* Current Status */}
      <Card className="luxury-gradient text-white border-0">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm opacity-90">Current Tier</p>
              <h2 className="text-3xl font-bold capitalize flex items-center gap-2">
                <Trophy className="h-8 w-8" />
                {tier}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Available Points</p>
              <h2 className="text-3xl font-bold">{loyaltyData?.points || 0}</h2>
            </div>
          </div>

          {nextTier && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{loyaltyData?.points || 0} points earned</span>
                <span>{TIER_THRESHOLDS[nextTier as keyof typeof TIER_THRESHOLDS]} to {nextTier}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <Sparkles className="h-5 w-5 mx-auto mb-1" />
              <p className="text-sm opacity-90">Earn Rate</p>
              <p className="font-bold">{benefits.earnRate}x</p>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <Star className="h-5 w-5 mx-auto mb-1" />
              <p className="text-sm opacity-90">Member Discount</p>
              <p className="font-bold">{benefits.discount}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="rewards" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="referrals">Refer & Earn</TabsTrigger>
          <TabsTrigger value="tiers">Tier Benefits</TabsTrigger>
        </TabsList>

        <TabsContent value="rewards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Redeem Your Points</CardTitle>
              <CardDescription>Convert your points to discounts on future purchases</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { points: 500, discount: 50, },
                { points: 1000, discount: 100, },
                { points: 2000, discount: 250, },
                { points: 5000, discount: 750, },
              ].map((reward) => (
                <div key={reward.points} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">₹{reward.discount} Discount</p>
                    <p className="text-sm text-muted-foreground">{reward.points} points</p>
                  </div>
                  <Button
                    disabled={!loyaltyData || loyaltyData.points < reward.points}
                    onClick={() => toast.success('Discount coupon generated!')}
                  >
                    Redeem
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Earn More Points</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>Shop & Earn</span>
                <Badge>₹100 = 1 point</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>Write a Review</span>
                <Badge>50 points</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>Refer a Friend</span>
                <Badge>500 points</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>Birthday Bonus</span>
                <Badge>200 points</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Share & Earn
              </CardTitle>
              <CardDescription>
                Invite friends and earn 500 points when they make their first purchase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Friend's email"
                  value={referralEmail}
                  onChange={(e) => setReferralEmail(e.target.value)}
                />
                <Button onClick={sendReferral}>Send</Button>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={`${window.location.origin}?ref=${loyaltyData?.user_id || ''}`}
                  className="flex-1"
                />
                <Button variant="outline" onClick={copyReferralLink}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              {referrals.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No referrals yet</p>
              ) : (
                <div className="space-y-3">
                  {referrals.map((ref) => (
                    <div key={ref.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{ref.referee_email}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(ref.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={ref.status === 'completed' ? "default" : "secondary"}>
                        {ref.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tiers" className="space-y-4">
          {Object.entries(TIER_THRESHOLDS).map(([tierName, threshold]) => {
            const tierBenefits = TIER_BENEFITS[tierName as keyof typeof TIER_BENEFITS];
            const isCurrentTier = tier === tierName;

            return (
              <Card key={tierName} className={isCurrentTier ? 'border-primary' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 capitalize">
                    <Trophy className="h-5 w-5" />
                    {tierName}
                    {isCurrentTier && <Badge>Current</Badge>}
                  </CardTitle>
                  <CardDescription>
                    {threshold === 0 ? 'Starting tier' : `Unlock at ${threshold} points`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      {tierBenefits.discount}% member discount on all purchases
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      {tierBenefits.earnRate}x points on every purchase
                    </li>
                    <li className="flex items-center gap-2">
                      <Gift className="h-4 w-4 text-primary" />
                      Exclusive {tierName} member offers
                    </li>
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
};