import { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const AppointmentBooking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    appointmentType: '',
    appointmentDate: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('Please sign in to book an appointment');
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.appointmentType || !formData.appointmentDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from('appointments').insert([{
      user_id: user.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      appointment_type: formData.appointmentType,
      appointment_date: formData.appointmentDate,
      notes: formData.notes || ''
    }]);

    if (error) {
      toast.error('Failed to book appointment');
    } else {
      toast.success('Appointment booked successfully! We\'ll contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        appointmentType: '',
        appointmentDate: '',
        notes: ''
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-serif font-bold mb-6 text-center">Book an Appointment</h2>
      <p className="text-muted-foreground text-center mb-8">
        Schedule a consultation, try-at-home service, or custom design session
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium flex items-center gap-2 mb-2">
              <User className="w-4 h-4" /> Full Name *
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4" /> Email *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4" /> Phone Number *
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98190 72971"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4" /> Appointment Type *
            </label>
            <Select
              value={formData.appointmentType}
              onValueChange={(value) => setFormData({ ...formData, appointmentType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="try-at-home">Try at Home</SelectItem>
                <SelectItem value="custom-design">Custom Design</SelectItem>
                <SelectItem value="repair">Repair/Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4" /> Preferred Date & Time *
          </label>
          <Input
            type="datetime-local"
            value={formData.appointmentDate}
            onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4" /> Additional Notes
          </label>
          <Textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Any specific requirements or questions?"
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? 'Booking...' : 'Book Appointment'}
        </Button>
      </form>
    </Card>
  );
};
