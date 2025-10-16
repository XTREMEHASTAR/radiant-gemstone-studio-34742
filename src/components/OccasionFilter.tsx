import { Button } from "@/components/ui/button";
import { Heart, Star, Sparkles, Sun, Calendar, Gift, Briefcase, PartyPopper } from "lucide-react";

interface OccasionFilterProps {
  selectedOccasion: string | null;
  onOccasionChange: (occasion: string | null) => void;
}

const occasions = [
  { value: "wedding", label: "Wedding", icon: Heart, color: "text-pink-500" },
  { value: "engagement", label: "Engagement", icon: Sparkles, color: "text-purple-500" },
  { value: "festival", label: "Festival", icon: Star, color: "text-amber-500" },
  { value: "daily_wear", label: "Daily Wear", icon: Sun, color: "text-blue-500" },
  { value: "anniversary", label: "Anniversary", icon: Calendar, color: "text-red-500" },
  { value: "birthday", label: "Birthday", icon: Gift, color: "text-green-500" },
  { value: "party", label: "Party", icon: PartyPopper, color: "text-indigo-500" },
  { value: "office", label: "Office", icon: Briefcase, color: "text-gray-500" },
];

export const OccasionFilter = ({ selectedOccasion, onOccasionChange }: OccasionFilterProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Shop by Occasion</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {occasions.map((occasion) => {
          const Icon = occasion.icon;
          const isSelected = selectedOccasion === occasion.value;
          
          return (
            <Button
              key={occasion.value}
              variant={isSelected ? "default" : "outline"}
              className="flex flex-col items-center justify-center h-24 gap-2"
              onClick={() => onOccasionChange(isSelected ? null : occasion.value)}
            >
              <Icon className={`w-6 h-6 ${isSelected ? "text-white" : occasion.color}`} />
              <span className="text-sm">{occasion.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
