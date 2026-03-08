import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Careers from "./pages/Careers";

import ResumeWriting from "./pages/ResumeWriting";
import CareerConsulting from "./pages/CareerConsulting";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import AdminPanel from "./pages/AdminPanel";

import PortfolioSkills from "./pages/PortfolioSkills";
import Templates from "./pages/Templates";
import Checkout from "./pages/Checkout";
import OrderWizard from "./pages/OrderWizard";
import PortfolioView from "./pages/PortfolioView";
import NotFound from "./pages/NotFound";
import ScrollToTopOnNavigate from "./components/ScrollToTopOnNavigate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTopOnNavigate />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            
            <Route path="/resume-writing" element={<ResumeWriting />} />
            <Route path="/career-consulting" element={<CareerConsulting />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/admin" element={<AdminPanel />} />
            
            <Route path="/portfolio-skills" element={<PortfolioSkills />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/checkout/:templateId" element={<Checkout />} />
            <Route path="/order" element={<OrderWizard />} />
            <Route path="/order/:templateId" element={<OrderWizard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
