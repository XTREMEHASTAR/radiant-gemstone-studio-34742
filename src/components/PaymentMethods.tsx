import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Smartphone, Bitcoin, Apple } from "lucide-react";

export const PaymentMethods = () => {
  const paymentOptions = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "UPI Payment",
      description: "Pay via Google Pay, PhonePe, Paytm",
      color: "text-blue-500",
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Cards",
      description: "Credit & Debit Cards",
      color: "text-green-500",
    },
    {
      icon: <Apple className="w-8 h-8" />,
      title: "Apple Pay",
      description: "Secure & Fast",
      color: "text-gray-700",
    },
    {
      icon: <Bitcoin className="w-8 h-8" />,
      title: "Crypto",
      description: "BTC, ETH, USDT",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {paymentOptions.map((option, index) => (
        <Card key={index} className="group hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className={`mb-3 ${option.color} group-hover:scale-110 transition-transform`}>
              {option.icon}
            </div>
            <h3 className="font-semibold text-sm mb-1">{option.title}</h3>
            <p className="text-xs text-muted-foreground">{option.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
