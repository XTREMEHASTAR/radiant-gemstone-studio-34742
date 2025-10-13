import { useState, useEffect, createContext, useContext } from 'react';
import { Globe } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';

const CURRENCIES = {
  INR: { symbol: '₹', name: 'Indian Rupee', rate: 1 },
  USD: { symbol: '$', name: 'US Dollar', rate: 0.012 },
  EUR: { symbol: '€', name: 'Euro', rate: 0.011 },
  GBP: { symbol: '£', name: 'British Pound', rate: 0.0095 },
  AED: { symbol: 'د.إ', name: 'UAE Dirham', rate: 0.044 },
  SGD: { symbol: 'S$', name: 'Singapore Dollar', rate: 0.016 },
};

type CurrencyCode = keyof typeof CURRENCIES;

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  convertPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>('INR');

  useEffect(() => {
    loadCurrency();
  }, []);

  const loadCurrency = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('user_preferences')
        .select('currency')
        .eq('user_id', user.id)
        .maybeSingle();

      if (data?.currency) {
        setCurrencyState(data.currency as CurrencyCode);
      }
    } catch (error) {
      console.error('Error loading currency:', error);
    }
  };

  const setCurrency = async (code: CurrencyCode) => {
    setCurrencyState(code);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('user_preferences')
        .upsert([{
          user_id: user.id,
          currency: code,
        }]);
    } catch (error) {
      console.error('Error saving currency:', error);
    }
  };

  const convertPrice = (price: number) => {
    const converted = price * CURRENCIES[currency].rate;
    return `${CURRENCIES[currency].symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          {CURRENCIES[currency].symbol} {currency}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(CURRENCIES).map(([code, { symbol, name }]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setCurrency(code as CurrencyCode)}
          >
            <span className="font-medium">{symbol} {code}</span>
            <span className="text-sm text-muted-foreground ml-2">{name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};