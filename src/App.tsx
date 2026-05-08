import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScrollToTopOnNavigate from "./components/ScrollToTopOnNavigate";

const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Careers = lazy(() => import("./pages/Careers"));
const ResumeWriting = lazy(() => import("./pages/ResumeWriting"));
const CareerConsulting = lazy(() => import("./pages/CareerConsulting"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const PortfolioSkills = lazy(() => import("./pages/PortfolioSkills"));
const CustomPortfolioDesign = lazy(() => import("./pages/CustomPortfolioDesign"));
const Templates = lazy(() => import("./pages/Templates"));
const TemplateSales = lazy(() => import("./pages/TemplateSales"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderWizard = lazy(() => import("./pages/OrderWizard"));
const PortfolioView = lazy(() => import("./pages/PortfolioView"));
const PortfolioAdmin = lazy(() => import("./pages/PortfolioAdmin"));

const queryClient = new QueryClient();

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTopOnNavigate />
          <Suspense fallback={<Loader />}>
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
              <Route path="/portfolio-skills" element={<PortfolioSkills />} />
              <Route path="/custom-portfolio-design" element={<CustomPortfolioDesign />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/templates/:id" element={<TemplateSales />} />
              <Route path="/checkout/:templateId" element={<Checkout />} />
              <Route path="/order" element={<OrderWizard />} />
              <Route path="/p/:id" element={<PortfolioView />} />
              <Route path="/p/:id/admin" element={<PortfolioAdmin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
