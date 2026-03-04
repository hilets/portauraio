import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, CreditCard, Lock, Mail, User, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';

const templates: Record<string, { name: string; price: number; image: string }> = {
  'ecom-fashion': { name: 'Fashion Store', price: 109, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop' },
  'ecom-electronics': { name: 'Tech Hub', price: 119, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop' },
  'ecom-food': { name: 'Fresh Market', price: 100, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop' },
  'ecom-beauty': { name: 'Glow Studio', price: 115, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop' },
  'ecom-furniture': { name: 'Home Craft', price: 129, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop' },
  'ecom-sports': { name: 'Active Gear', price: 105, image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop' },
};

const Checkout = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', card: '', expiry: '', cvc: '' });

  const template = templates[templateId || ''];
  if (!template) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl mb-4">Template not found</h1>
          <Button onClick={() => navigate('/templates')}>Back to Templates</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <CustomCursor />
      <Header />
      <main className="relative z-10 pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          {/* Back */}
          <motion.button
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/templates')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="w-4 h-4" />
            {step > 1 ? 'Back' : 'All Templates'}
          </motion.button>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-10">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-primary' : 'bg-muted'}`} />}
              </div>
            ))}
            <span className="ml-3 text-sm text-muted-foreground">
              {step === 1 ? 'Review' : step === 2 ? 'Payment' : 'Complete'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Main content */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="font-heading text-2xl font-bold mb-6">Review Your Order</h2>
                    <div className="rounded-2xl border border-border/50 bg-card/80 overflow-hidden">
                      <img src={template.image} alt={template.name} className="w-full aspect-video object-cover" />
                      <div className="p-6">
                        <h3 className="font-heading text-xl font-bold mb-2">{template.name}</h3>
                        <p className="text-muted-foreground mb-4">Full e-commerce template with all pages, components, and responsive design.</p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {['Fully responsive design', 'Product pages & cart', 'Checkout flow', 'Admin dashboard', 'Source code included'].map(f => (
                            <li key={f} className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" />{f}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <Button variant="hero" size="xl" className="w-full mt-6 gap-2" onClick={() => setStep(2)}>
                      Continue to Payment <ArrowRight className="w-5 h-5" />
                    </Button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="font-heading text-2xl font-bold mb-6">Payment Details</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Card Number</label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="text"
                            value={formData.card}
                            onChange={e => setFormData({ ...formData, card: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="4242 4242 4242 4242"
                            maxLength={19}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-muted-foreground mb-1 block">Expiry</label>
                          <input
                            type="text"
                            value={formData.expiry}
                            onChange={e => setFormData({ ...formData, expiry: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground mb-1 block">CVC</label>
                          <input
                            type="text"
                            value={formData.cvc}
                            onChange={e => setFormData({ ...formData, cvc: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                        <Lock className="w-3 h-3" />
                        Secured with 256-bit SSL encryption
                      </div>
                    </div>
                    <Button variant="hero" size="xl" className="w-full mt-6 gap-2" onClick={handleSubmit}>
                      Pay ${template.price} <Lock className="w-4 h-4" />
                    </Button>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="complete" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-6"
                    >
                      <Check className="w-10 h-10 text-primary" />
                    </motion.div>
                    <h2 className="font-heading text-3xl font-bold mb-3">Order Confirmed!</h2>
                    <p className="text-muted-foreground mb-8">
                      Your {template.name} template is ready. Check your email for download instructions.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button variant="hero" onClick={() => navigate('/')}>
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Go Home
                      </Button>
                      <Button variant="outline" onClick={() => navigate('/templates')}>
                        More Templates
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-32 rounded-2xl border border-border/50 bg-card/80 p-6">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Order Summary</h3>
                <div className="flex items-center gap-4 mb-4">
                  <img src={template.image} alt={template.name} className="w-16 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="font-semibold text-sm">{template.name}</p>
                    <p className="text-xs text-muted-foreground">E-Commerce Template</p>
                  </div>
                </div>
                <div className="border-t border-border/50 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Template</span>
                    <span>${template.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Support (1yr)</span>
                    <span className="text-primary">Free</span>
                  </div>
                  <div className="border-t border-border/50 pt-2 flex justify-between font-heading font-bold">
                    <span>Total</span>
                    <span className="text-primary">${template.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
