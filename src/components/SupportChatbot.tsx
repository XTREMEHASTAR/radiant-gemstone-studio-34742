import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Headphones, Send, X, Loader2, Phone, Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
}

const FAQ_RESPONSES: Record<string, { answer: string; quickReplies?: string[] }> = {
  'hours': {
    answer: 'Our store is open Monday to Saturday, 10 AM - 8 PM. We are closed on Sundays. You can also shop online 24/7!',
    quickReplies: ['Track my order', 'Return policy', 'Contact info']
  },
  'shipping': {
    answer: 'We offer free shipping on orders above ₹10,000. Standard delivery takes 3-5 business days. Express delivery (1-2 days) is available for ₹500.',
    quickReplies: ['Track my order', 'International shipping', 'Return policy']
  },
  'returns': {
    answer: 'We have a 7-day return policy. Items must be in original condition with tags. Custom-made jewelry is non-returnable. Contact us to initiate a return.',
    quickReplies: ['Initiate return', 'Exchange policy', 'Refund timeline']
  },
  'warranty': {
    answer: 'All jewelry comes with a 1-year warranty against manufacturing defects. Lifetime free cleaning and polishing available. Certificates provided for precious stones.',
    quickReplies: ['Repair service', 'Certificate details', 'Care instructions']
  },
  'payment': {
    answer: 'We accept all major credit/debit cards, UPI, net banking, and cash on delivery. EMI options available on purchases above ₹20,000.',
    quickReplies: ['EMI options', 'Payment security', 'Billing info']
  },
  'custom': {
    answer: 'Yes! We specialize in custom designs. Share your vision with our designers and we\'ll create a unique piece just for you. Typical timeline is 2-3 weeks.',
    quickReplies: ['Book consultation', 'Design portfolio', 'Pricing']
  },
};

const COMMON_QUESTIONS = [
  'What are your store hours?',
  'How does shipping work?',
  'What is your return policy?',
  'Do you offer warranty?',
  'What payment methods do you accept?',
  'Can I get custom jewelry made?',
];

export const SupportChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content: 'Hello! I\'m here to help you with any questions about our jewelry and services. How can I assist you today?',
      timestamp: new Date(),
      quickReplies: ['Store hours', 'Shipping info', 'Return policy', 'Custom orders'],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userInput: string): { answer: string; quickReplies?: string[] } => {
    const input = userInput.toLowerCase();
    
    // Check for keyword matches
    if (input.includes('hour') || input.includes('time') || input.includes('open')) {
      return FAQ_RESPONSES['hours'];
    }
    if (input.includes('ship') || input.includes('deliver')) {
      return FAQ_RESPONSES['shipping'];
    }
    if (input.includes('return') || input.includes('refund') || input.includes('exchange')) {
      return FAQ_RESPONSES['returns'];
    }
    if (input.includes('warrant') || input.includes('guarantee') || input.includes('certificate')) {
      return FAQ_RESPONSES['warranty'];
    }
    if (input.includes('payment') || input.includes('pay') || input.includes('emi')) {
      return FAQ_RESPONSES['payment'];
    }
    if (input.includes('custom') || input.includes('design') || input.includes('bespoke')) {
      return FAQ_RESPONSES['custom'];
    }
    
    // Default response
    return {
      answer: 'I\'d be happy to help! Here are some common topics I can assist with. Please select one or ask your question:',
      quickReplies: ['Store hours', 'Shipping info', 'Return policy', 'Payment options', 'Custom designs', 'Talk to agent']
    };
  };

  const handleSend = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim() || isTyping) return;

    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getBotResponse(text);
      const botMessage: Message = {
        role: 'bot',
        content: response.answer,
        timestamp: new Date(),
        quickReplies: response.quickReplies,
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 left-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          variant="glow"
          size="lg"
          className="rounded-full shadow-2xl"
        >
          <Headphones className="w-6 h-6 mr-2" />
          Support
        </Button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
      >
        <Card className="fixed bottom-6 left-6 w-[400px] h-[650px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white flex flex-row items-center justify-between space-y-0 pb-4 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Headphones className="w-5 h-5" />
              Customer Support
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            {/* Contact Info Banner */}
            <div className="bg-muted/50 p-3 border-b text-xs space-y-1">
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                <span>9819072971</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                <span>Bhulaxmi916@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                <span>Mumbai - Since 1997</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[80%] space-y-2">
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-muted rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    
                    {/* Quick Replies */}
                    {message.role === 'bot' && message.quickReplies && (
                      <div className="flex flex-wrap gap-2">
                        {message.quickReplies.map((reply, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickReply(reply)}
                            className="text-xs h-7"
                          >
                            {reply}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-[10px] text-muted-foreground px-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Common Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">Common questions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {COMMON_QUESTIONS.slice(0, 4).map((q, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSend(q)}
                      className="text-xs h-auto py-2 px-2 text-left whitespace-normal"
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t bg-background">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  disabled={isTyping}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={isTyping || !input.trim()}
                  size="icon"
                  variant="premium"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};
