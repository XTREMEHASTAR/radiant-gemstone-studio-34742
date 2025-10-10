import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Mock live price data - in production, this would fetch from a real API
const getPriceData = (metal: string) => {
  const basePrices = {
    'gold': 65.50,
    'silver': 0.85,
    'platinum': 32.40,
    'palladium': 30.10
  };

  const basePrice = basePrices[metal as keyof typeof basePrices] || basePrices.gold;
  const randomChange = (Math.random() - 0.5) * 2; // -1% to +1%

  return {
    metal,
    price: basePrice * (1 + randomChange / 100),
    change: randomChange,
    lastUpdate: new Date().toISOString()
  };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { metal = 'gold' } = await req.json();
    const priceData = getPriceData(metal);

    return new Response(
      JSON.stringify(priceData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error fetching prices:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
