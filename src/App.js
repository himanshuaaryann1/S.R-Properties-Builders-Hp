import { useState, useEffect, useCallback, useRef } from "react";
import "@/App.css";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Phone, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Handshake, 
  Award,
  Menu,
  X,
  ChevronRight,
  Home as HomeIcon,
  Building2,
  LandPlot,
  Store,
  Calculator,
  MessageCircle,
  Mail,
  Clock,
  Instagram,
  Quote
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Slider } from "./components/ui/slider";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "./components/ui/select";
import { Toaster, toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = BACKEND_URL ? `${BACKEND_URL}/api` : "";

// ============== SCROLL ANIMATION HOOK ==============
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};

// ============== ANIMATED SECTION WRAPPER ==============
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation(0.1);
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// ============== NAVBAR COMPONENT ==============
const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const goToContactPage = () => {
    setIsMobileMenuOpen(false);
    navigate("/contact");
  };

  return (
    <nav 
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "glass-solid shadow-soft py-3" 
          : "bg-transparent py-5"
      }`}
      style={{
        borderRadius: isScrolled ? '0' : '0',
        borderBottom: isScrolled ? '1px solid rgba(226, 232, 240, 0.5)' : 'none'
      }}
    >
      <div className="section-container flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
            <img 
              src="/ChatGPT Image Apr 25, 2026, 10_44_15 AM.png"
              alt="S.R Properties Logo"
              className="w-full h-full object-cover object-center shadow-soft"
            />
          </div>
          <div>
            <h1 className="font-semibold text-lg text-[#0F172A]">S.R Properties & Builders</h1>
            <p className="text-xs text-[#94A3B8] -mt-0.5">Real Estate & Property Dealer</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <button onClick={() => scrollToSection("properties")} className="text-[#475569] hover:text-[#2563EB] transition-colors font-medium text-[15px]">
            Properties
          </button>
          <button onClick={() => scrollToSection("emi-calculator")} className="text-[#475569] hover:text-[#2563EB] transition-colors font-medium text-[15px]">
            EMI Calculator
          </button>
          <button onClick={() => scrollToSection("about")} className="text-[#475569] hover:text-[#2563EB] transition-colors font-medium text-[15px]">
            About
          </button>
          <button onClick={goToContactPage} className="text-[#475569] hover:text-[#2563EB] transition-colors font-medium text-[15px]">
            Contact
          </button>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a href="tel:+919816021084" className="btn-gradient inline-flex items-center gap-2 text-[15px]">
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-xl hover:bg-[#F1F5F9] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6 text-[#0F172A]" /> : <Menu className="w-6 h-6 text-[#0F172A]" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-soft-lg animate-fade-in border-t border-[#E2E8F0]">
          <div className="section-container py-6 flex flex-col gap-1">
            <button onClick={() => scrollToSection("properties")} className="text-left py-3 px-4 text-[#475569] hover:text-[#2563EB] hover:bg-[#F8FAFC] rounded-xl transition-all font-medium">
              Properties
            </button>
            <button onClick={() => scrollToSection("emi-calculator")} className="text-left py-3 px-4 text-[#475569] hover:text-[#2563EB] hover:bg-[#F8FAFC] rounded-xl transition-all font-medium">
              EMI Calculator
            </button>
            <button onClick={() => scrollToSection("about")} className="text-left py-3 px-4 text-[#475569] hover:text-[#2563EB] hover:bg-[#F8FAFC] rounded-xl transition-all font-medium">
              About
            </button>
            <button onClick={goToContactPage} className="text-left py-3 px-4 text-[#475569] hover:text-[#2563EB] hover:bg-[#F8FAFC] rounded-xl transition-all font-medium">
              Contact
            </button>
            <a href="tel:+919816021084" className="btn-gradient inline-flex items-center justify-center gap-2 mt-4">
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

// ============== HERO SECTION ==============
const HeroSection = () => {
  const scrollToProperties = () => {
    document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section data-testid="hero-section" className="min-h-screen pt-24 lg:pt-0 flex items-center overflow-hidden relative">
      {/* Gradient glow effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-indigo-400/15 to-blue-300/15 rounded-full blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
              <span className="text-[#2563EB] font-medium text-sm">Trusted Property Deals in Shimla</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
              Find Your Perfect<br />
              <span className="text-gradient">Property</span> in Shimla & Himachal Pradesh
            </h1>
            
            <p className="text-lg text-[#334155] mb-10 leading-relaxed max-w-lg">
              Trusted by families &bull; Verified listings &bull; Hassle-free process
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <button 
                data-testid="hero-view-properties-btn"
                onClick={scrollToProperties}
                className="btn-primary flex items-center gap-2"
              >
                View Properties
                <ChevronRight className="w-4 h-4" />
              </button>
              <a 
                data-testid="hero-call-now-btn"
                href="tel:+919816021084" 
                className="btn-secondary flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>

            {/* Dealer Info Card - Glass Effect */}
            <div className="glass rounded-[18px] p-5 max-w-sm shadow-soft animate-fade-in-up animation-delay-300">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src="/ChatGPT Image Apr 25, 2026, 10_44_15 AM.png"
                    alt="Property Consultant"
                    className="w-full h-full object-cover object-center border-2 border-white/50 shadow-soft"
                  />
                </div>
                <div>
                  <p className="font-semibold text-[#0F172A]">S.R Properties & Builders</p>
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[1,2,3,4].map(i => (
                        <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                      ))}
                      <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B] opacity-60" />
                    </div>
                    <span className="text-sm text-[#334155] ml-1">100+ Google Reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fade-in animation-delay-200">
            <div className="relative hero-image-overlay rounded-[28px] overflow-hidden shadow-glow">
              <img 
                src="/albert-hyseni-jGyrESfCPyw-unsplash.jpg"
                alt="Modern Luxury House"
                className="w-full h-[420px] lg:h-[520px] object-cover object-center"
              />
              
              {/* Floating Glass Card - Verified Dealer */}
              <div className="absolute bottom-6 left-6 glass rounded-[16px] p-4 shadow-soft-lg animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center shadow-soft">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">Verified Dealer</p>
                    <p className="text-sm text-[#334155]">30+ Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative glow elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#2563EB]/20 to-[#0EA5E9]/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-[#0EA5E9]/15 to-[#2563EB]/15 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============== TRUST SECTION ==============
const TrustSection = () => {
  const trustBadges = [
    { icon: ShieldCheck, title: "Verified Listings", desc: "Every property is personally verified" },
    { icon: Handshake, title: "Transparent Deals", desc: "No hidden charges or surprises" },
    { icon: Award, title: "Local Expert", desc: "Deep knowledge of the Shimla & Himachal Pradesh markets" }
  ];

  return (
    <section data-testid="trust-section" className="py-20 relative">
      <div className="section-container">
        {/* Google Rating & Area */}
        <AnimatedSection className="text-center mb-14">
          <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3 mb-5 shadow-soft">
            <div className="flex">
              {[1,2,3,4].map(i => (
                <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
              ))}
              <Star className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B] opacity-60" />
            </div>
            <span className="font-semibold text-[#0F172A]">4.6</span>
            <span className="text-[#334155]">&bull; 100+ Google Reviews</span>
          </div>
          <p className="text-[#334155] inline-flex items-center gap-2">
            Serving Shimla, Himachal Pradesh & nearby areas
          </p>
        </AnimatedSection>

        {/* Trust Badges */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {trustBadges.map((badge, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <Card className="glass-card border-0 hover-lift rounded-[20px] h-full">
                <CardContent className="p-7 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB]/10 to-[#0EA5E9]/10 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 hover:scale-110">
                    <badge.icon className="w-7 h-7 text-[#2563EB]" />
                  </div>
                  <h3 className="font-semibold text-lg text-[#0F172A] mb-2">{badge.title}</h3>
                  <p className="text-[#334155] text-sm leading-relaxed">{badge.desc}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* Dealer Card */}
        <AnimatedSection className="flex justify-center" delay={300}>
          <Card className="glass border-0 shadow-soft-lg max-w-md w-full rounded-[20px] hover-lift">
            <CardContent className="p-7 flex items-center gap-5">
              <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                <img 
                  src="/ChatGPT Image Apr 25, 2026, 10_44_15 AM.png"
                  alt="S.R Properties & Builders"
                  className="w-full h-full object-cover object-center shadow-soft transition-transform duration-400 hover:scale-110"
                />
              </div>
              <div>
                <h3 className="font-semibold text-xl text-[#0F172A]">S.R Properties & Builders</h3>
                <p className="text-[#2563EB] font-medium flex items-center gap-2 mt-1.5">
                  <Clock className="w-4 h-4" />
                  30+ Years Experience
                </p>
                <p className="text-[#334155] text-sm mt-1">Trusted by 1000+ families</p>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
};

// ============== PROPERTY CARD COMPONENT ==============
const PropertyCard = ({ property }) => {
  const getTypeBadgeClass = (type) => {
    const classes = {
      'Flat': 'badge-flat',
      'House': 'badge-house',
      'Plot': 'badge-plot',
      'Commercial': 'badge-commercial'
    };
    return classes[type] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'Flat': Building2,
      'House': HomeIcon,
      'Plot': LandPlot,
      'Commercial': Store
    };
    return icons[type] || HomeIcon;
  };

  const TypeIcon = getTypeIcon(property.property_type);

  return (
    <Card 
      data-testid={`property-card-${property.id}`}
      className="property-card border-0 glass-card hover-lift overflow-hidden group cursor-pointer rounded-[20px]"
    >
      <div className="relative overflow-hidden">
        <img 
          src={property.image}
          alt={property.title}
          className="property-card-image w-full h-56 object-cover"
        />
        {/* Price Tag */}
        <div className="absolute top-4 right-4 glass rounded-xl px-4 py-2">
          <p className="font-bold text-[#0F172A] text-lg">{property.price_display}</p>
        </div>
        {/* Type Badge */}
        <div className={`absolute top-4 left-4 rounded-full px-3.5 py-1.5 flex items-center gap-1.5 text-sm font-medium ${getTypeBadgeClass(property.property_type)}`}>
          <TypeIcon className="w-3.5 h-3.5" />
          {property.property_type}
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="font-semibold text-lg text-[#0F172A] mb-2 line-clamp-1 group-hover:text-[#2563EB] transition-colors">
          {property.title}
        </h3>
        <p className="text-[#334155] flex items-center gap-1.5 mb-3 text-sm">
          <MapPin className="w-4 h-4 text-[#2563EB]" />
          {property.location}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]/50">
          <p className="text-sm text-[#334155]">{property.area}</p>
          <Button 
            variant="ghost" 
            className="text-[#2563EB] hover:bg-[#2563EB]/10 font-medium opacity-0 group-hover:opacity-100 transition-all rounded-xl"
          >
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// ============== PROPERTIES SECTION ==============
const PropertiesSection = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "all",
    location: "all",
    priceRange: "all"
  });

  const fetchProperties = useCallback(async () => {
    if (!API) {
      setProperties([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      let url = `${API}/properties`;
      const params = new URLSearchParams();
      
      if (filters.type !== "all") {
        params.append("property_type", filters.type);
      }
      if (filters.location !== "all") {
        params.append("location", filters.location);
      }
      if (filters.priceRange !== "all") {
        const [min, max] = filters.priceRange.split("-");
        if (min) params.append("min_price", min);
        if (max) params.append("max_price", max);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await axios.get(url);
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return (
    <section id="properties" data-testid="properties-section" className="section-padding relative">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-300/10 rounded-full blur-3xl"></div>
      
      <div className="section-container relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
            Featured Properties
          </h2>
          <p className="text-[#334155] text-lg max-w-2xl mx-auto">
            Explore our handpicked selection of properties in Shimla, Himachal Pradesh
          </p>
        </AnimatedSection>

        {/* Filters */}
        <AnimatedSection className="flex flex-wrap gap-4 justify-center mb-12" delay={100}>
          <Select 
            value={filters.type} 
            onValueChange={(value) => setFilters({...filters, type: value})}
          >
            <SelectTrigger data-testid="property-filter-type" className="w-[160px] glass-card border-white/30 rounded-xl h-11 transition-all duration-300 hover:shadow-soft">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Flat">Flat</SelectItem>
              <SelectItem value="House">House</SelectItem>
              <SelectItem value="Plot">Plot</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.location} 
            onValueChange={(value) => setFilters({...filters, location: value})}
          >
            <SelectTrigger data-testid="property-filter-location" className="w-[180px] glass-card border-white/30 rounded-xl h-11 transition-all duration-300 hover:shadow-soft">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Shimla">Shimla</SelectItem>
              <SelectItem value="Kalka">Kalka</SelectItem>
              <SelectItem value="Parwanoo">Parwanoo</SelectItem>
              <SelectItem value="Barog">Barog</SelectItem>
              <SelectItem value="Kasauli">Kasauli</SelectItem>
              <SelectItem value="Dharamshala">Dharamshala</SelectItem>
              <SelectItem value="Mandi">Mandi</SelectItem>
              <SelectItem value="Kullu">Kullu</SelectItem>
              <SelectItem value="Manali">Manali</SelectItem>
              <SelectItem value="Solan">Solan</SelectItem>
              <SelectItem value="Nahan">Nahan</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.priceRange} 
            onValueChange={(value) => setFilters({...filters, priceRange: value})}
          >
            <SelectTrigger data-testid="property-filter-price" className="w-[180px] glass-card border-white/30 rounded-xl h-11 transition-all duration-300 hover:shadow-soft">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="0-5000000">Under 50 Lac</SelectItem>
              <SelectItem value="5000000-10000000">50 Lac - 1 Cr</SelectItem>
              <SelectItem value="10000000-">Above 1 Cr</SelectItem>
            </SelectContent>
          </Select>
        </AnimatedSection>

        {/* Properties Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="spinner"></div>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#334155]">No properties found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {properties.map((property, index) => (
              <AnimatedSection key={property.id} delay={index * 80}>
                <PropertyCard property={property} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// ============== EMI CALCULATOR SECTION ==============
const EMICalculatorSection = () => {
  const [propertyPrice, setPropertyPrice] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const principal = propertyPrice;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    
    if (monthlyRate === 0) {
      setEmi(principal / months);
    } else {
      const emiValue = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
      setEmi(Math.round(emiValue));
    }
  }, [propertyPrice, interestRate, tenure]);

  const formatCurrency = (value) => {
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `${(value / 100000).toFixed(2)} Lac`;
    }
    return value.toLocaleString('en-IN');
  };

  return (
    <section id="emi-calculator" data-testid="emi-calculator-section" className="section-padding relative">
      <div className="section-container">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
            EMI Calculator
          </h2>
          <p className="text-[#334155] text-lg max-w-2xl mx-auto">
            Plan your home loan with our easy EMI calculator
          </p>
        </AnimatedSection>

        <AnimatedSection className="max-w-4xl mx-auto" delay={150}>
          <Card className="glass border-0 shadow-soft-lg overflow-hidden rounded-[24px] hover-lift">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                {/* Inputs */}
                <div className="p-8 lg:p-10 space-y-9">
                  {/* Property Price */}
                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="text-[#334155] font-medium">Property Price</label>
                      <span className="font-semibold text-[#0F172A]">{formatCurrency(propertyPrice)}</span>
                    </div>
                    <Slider
                      data-testid="emi-calc-price-input"
                      value={[propertyPrice]}
                      onValueChange={([value]) => setPropertyPrice(value)}
                      min={1000000}
                      max={50000000}
                      step={500000}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-xs text-[#64748B]">
                      <span>10 Lac</span>
                      <span>5 Cr</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="text-[#334155] font-medium">Interest Rate</label>
                      <span className="font-semibold text-[#0F172A]">{interestRate}%</span>
                    </div>
                    <Slider
                      data-testid="emi-calc-rate-input"
                      value={[interestRate]}
                      onValueChange={([value]) => setInterestRate(value)}
                      min={6}
                      max={15}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-xs text-[#64748B]">
                      <span>6%</span>
                      <span>15%</span>
                    </div>
                  </div>

                  {/* Tenure */}
                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="text-[#334155] font-medium">Loan Tenure</label>
                      <span className="font-semibold text-[#0F172A]">{tenure} Years</span>
                    </div>
                    <Slider
                      data-testid="emi-calc-tenure-input"
                      value={[tenure]}
                      onValueChange={([value]) => setTenure(value)}
                      min={5}
                      max={30}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-xs text-[#64748B]">
                      <span>5 Years</span>
                      <span>30 Years</span>
                    </div>
                  </div>
                </div>

                {/* Result */}
                <div className="bg-gradient-to-br from-[#EEF2FF] to-[#E0F2FE] p-8 lg:p-10 flex flex-col justify-center items-center text-center">
                  <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-5 shadow-soft transition-transform duration-300 hover:scale-110">
                    <Calculator className="w-8 h-8 text-[#2563EB]" />
                  </div>
                  <p className="text-[#334155] mb-3">Your Monthly EMI</p>
                  <p data-testid="emi-calc-result" className="text-4xl md:text-5xl font-bold text-gradient mb-2 transition-all duration-300">
                    {emi.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[#334155] text-sm mb-8">per month</p>
                  <a 
                    href="tel:+919816021084"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Consult for Loan
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
};

// ============== TESTIMONIALS SECTION ==============
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Himanshu Aryan",
      initial: "H",
      review: "One of the nicest property dealers I've worked with. Honest, responsive, and actually cares about what you need instead of just closing the deal."
    },
    {
      name: "Amit Sharma",
      initial: "A",
      review: "Quick response, good options, and very easy to work with. He understands the market well and guides you properly."
    },
    {
      name: "Shruti Goel",
      initial: "S",
      review: "Smooth experience from start to finish. Everything was explained clearly, and there were no hidden issues. I felt confident throughout the process."
    },
    {
      name: "Ravinder Singh",
      initial: "R",
      review: "Very professional and transparent dealing. He helped me find the right property within my budget without wasting time. Highly recommended."
    }
  ];

  return (
    <section data-testid="testimonials-section" className="section-padding relative">
      <div className="section-container">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
            What Our Clients Say
          </h2>
          <p className="text-[#334155] text-lg max-w-2xl mx-auto">
            Real experiences from clients who found the right property with us
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-7">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <Card className="testimonial-card relative border-0 glass-card overflow-hidden rounded-[20px] hover-lift h-full min-h-[360px]">
                <CardContent className="p-7 pt-9 flex h-full flex-col">
                  <Quote className="w-8 h-8 text-[#2563EB]/20 mb-4 transition-transform duration-300 hover:scale-110" />
                  <p className="text-[#334155] mb-6 leading-relaxed flex-1 break-words">{testimonial.review}</p>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 aspect-square flex-shrink-0 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-semibold text-lg">
                        {testimonial.initial}
                      </div>
                      <div>
                        <p className="font-semibold text-[#0F172A]">{testimonial.name}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]"
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============== ABOUT SECTION ==============
const AboutSection = () => {
  return (
    <section id="about" data-testid="about-section" className="section-padding relative">
      {/* Gradient accent */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-400/10 to-blue-300/10 rounded-full blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="animate-fade-in">
            <div className="relative">
              <div className="rounded-[16px] shadow-glow w-full max-w-lg mx-auto overflow-hidden">
                <img 
                  src="/home-story KALRA.jpg"
                  alt="Kalra Property Story"
                  className="w-full h-auto object-cover object-center"
                />
              </div>
              {/* Stats Card */}
              <div className="absolute -bottom-6 -right-6 glass rounded-[20px] p-6 shadow-soft-lg hidden md:block animate-slide-in-right animation-delay-300">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gradient">1000+</p>
                    <p className="text-sm text-[#334155] mt-1">Happy Families</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gradient">30+</p>
                    <p className="text-sm text-[#334155] mt-1">Years Experience</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative glow */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-[#2563EB]/20 to-[#0EA5E9]/20 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* Content */}
          <div className="animate-fade-in animation-delay-200">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
              <span className="text-[#2563EB] font-medium text-sm">About Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight mb-6">
              Your Trusted Property Partner in Shimla & Himachal Pradesh
            </h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              S.R Properties & Builders is a trusted real estate service provider with over 30 years of experience, offering expert property buying, selling, and construction services across Shimla and Himachal Pradesh.
            </p>
            <p className="text-[#334155] leading-relaxed mb-10">
              Led by Mr. Bakhtawar Singh, a highly respected name in the industry with 30 years of experience, the company has built a reputation as one of the most trusted real estate service providers in the region. We specialize in residential and commercial properties, delivering reliable deals, transparent processes, and professional service to every client.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="tel:+919816021084"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <a 
                data-testid="whatsapp-contact-btn"
                href="https://wa.me/919816021084"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white font-semibold px-7 py-3.5 rounded-2xl transition-all duration-300 hover:scale-[1.03] inline-flex items-center gap-2 shadow-soft whatsapp-pulse"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============== CONTACT SECTION ==============
const ContactSection = () => {
  return (
    <section id="contact" data-testid="contact-section" className="section-padding relative">
      {/* Gradient accent */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-cyan-300/10 rounded-full blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <div className="text-center mb-14 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
            Get in Touch
          </h2>
          <p className="text-[#334155] text-lg max-w-2xl mx-auto">
            Ready to find your dream property? Contact us today!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map & Contact Info */}
          <div className="animate-fade-in">
            {/* Map */}
            <div className="map-container mb-8 rounded-[20px] shadow-soft">
              <iframe
                title="Kalra Property Consultant Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3408.056157495672!2d77.6426377733214!3d31.104776273357187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3905787e2c5e3d3d%3A0x38c5c8c5c5c5c5c5!2sSDA%20Commercial%20Complex%2C%20Kasumpti%2C%20Shimla%2C%20Himachal%20Pradesh%20171009!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="w-full h-64 sm:h-72 md:h-80 rounded-[20px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              <Card className="glass-card border-0 hover-lift rounded-[16px]">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB]/15 to-[#0EA5E9]/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">Office Address</p>
                    <p className="text-[#334155] text-sm">Shop No -133, Block 17, SDA Commercial Complex, Kasumpti, Shimla, Himachal Pradesh 171009</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0 hover-lift rounded-[16px]">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB]/15 to-[#0EA5E9]/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">Phone</p>
                    <a href="tel:+919816021084" className="text-[#2563EB] hover:underline block">09816021084</a>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0 hover-lift rounded-[16px]">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB]/15 to-[#0EA5E9]/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">Email</p>
                    <a href="mailto:bakhtawar.singh646@gmail.com" className="text-[#2563EB] hover:underline">bakhtawar.singh646@gmail.com</a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="animate-fade-in animation-delay-200">
            <Card className="glass border-0 shadow-soft-lg rounded-[24px]">
              <CardContent className="p-8 lg:p-10 text-center">
                <h3 className="text-xl font-semibold text-[#0F172A] mb-4">Ready to message us?</h3>
                <p className="text-[#334155] mb-8 leading-relaxed">
                  For the fastest response, fill out our dedicated contact form on the next page.
                </p>
                <a
                  href="#/contact"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  Open Contact Form
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============== CONTACT FORM COMPONENT ==============
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    planning: "",
    budget: "",
    propertyType: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      toast.error("Please fill in your name and phone number");
      return;
    }

    if (!API) {
      toast.error("Backend service is not configured. Please call us directly.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/leads`, {
        name: formData.name,
        phone: formData.phone,
        planning_timeline: formData.planning || null,
        budget: formData.budget || null,
        property_type: formData.propertyType || null,
        message: formData.message || null
      });

      toast.success("Message sent successfully! We'll contact you shortly.");
      setFormData({ name: "", phone: "", planning: "", budget: "", propertyType: "", message: "" });
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast.error("Something went wrong. Please try calling us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass border-0 shadow-soft-lg rounded-[24px] mx-auto max-w-3xl">
      <CardContent className="p-8 lg:p-10">
        <h3 className="text-2xl font-semibold text-[#0F172A] mb-7">Send us a message</h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#334155] mb-2">Your Name *</label>
            <Input
              data-testid="contact-name-input"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="glass-card border-white/30 rounded-xl h-12"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#334155] mb-2">Phone Number *</label>
            <Input
              data-testid="contact-phone-input"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
              className="glass-card border-white/30 rounded-xl h-12"
              inputMode="numeric"
              pattern="[0-9]*"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#334155] mb-2">When are you planning to buy?</label>
            <Select
              value={formData.planning}
              onValueChange={(value) => setFormData({ ...formData, planning: value })}
            >
              <SelectTrigger data-testid="contact-planning-select" className="glass-card border-white/30 rounded-xl h-12">
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Immediately">Immediately</SelectItem>
                <SelectItem value="Within 1 Month">Within 1 Month</SelectItem>
                <SelectItem value="Within 3 Months">Within 3 Months</SelectItem>
                <SelectItem value="Within 6 Months">Within 6 Months</SelectItem>
                <SelectItem value="Just Exploring">Just Exploring</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#334155] mb-2">Budget Range</label>
            <Select
              value={formData.budget}
              onValueChange={(value) => setFormData({ ...formData, budget: value })}
            >
              <SelectTrigger data-testid="contact-budget-select" className="glass-card border-white/30 rounded-xl h-12">
                <SelectValue placeholder="Select your budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Under 30 Lac">Under 30 Lac</SelectItem>
                <SelectItem value="30-50 Lac">30 - 50 Lac</SelectItem>
                <SelectItem value="50 Lac - 1 Cr">50 Lac - 1 Cr</SelectItem>
                <SelectItem value="1-2 Cr">1 - 2 Cr</SelectItem>
                <SelectItem value="Above 2 Cr">Above 2 Cr</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#334155] mb-2">Property Type</label>
            <Select
              value={formData.propertyType}
              onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
            >
              <SelectTrigger className="glass-card border-white/30 rounded-xl h-12">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Flat">Flat</SelectItem>
                <SelectItem value="House">House</SelectItem>
                <SelectItem value="Plot">Plot</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            data-testid="contact-submit-btn"
            type="submit"
            className="w-full btn-primary h-12 text-base"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="spinner"></div>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/20">
          <p className="text-center text-[#334155] text-sm mb-4">Or contact us directly</p>
          <div className="flex gap-3 flex-col sm:flex-row">
            <a
              href="tel:+919816021084"
              className="flex-1 btn-secondary text-center py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <a
              href="https://wa.me/919816021084"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#25D366] text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#20BD5C] transition-colors font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ContactFormPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="section-padding relative">
        <div className="section-container relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
              Message S.R Properties & Builders
            </h2>
            <p className="text-[#334155] text-lg max-w-2xl mx-auto">
              Share your requirements here and our consultant will get back to you shortly.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
      <Toaster position="top-center" richColors />
    </div>
  );
};
const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white py-14">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <h3 className="font-semibold text-lg">S.R Properties & Builders</h3>
              <p className="text-xs text-slate-400 -mt-0.5">Real Estate & Property Dealer</p>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              S.R Properties & Builders is a trusted real estate service provider with over 30 years of experience, offering expert property buying, selling, and construction services. Led by Mr. Bakhtawar Singh, a highly respected name in the industry with 30 years of experience, we specialize in residential and commercial properties, delivering reliable deals, transparent processes, and professional service to every client.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#properties" className="hover:text-white transition-colors">Properties</a></li>
              <li><a href="#emi-calculator" className="hover:text-white transition-colors">EMI Calculator</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-5">Contact Us</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-[#0EA5E9]" />
                <span>Shop No -133, Block 17, SDA Commercial Complex,<br />Kasumpti, Shimla, Himachal Pradesh 171009</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#0EA5E9]" />
                <a href="tel:+919816021084" className="hover:text-white transition-colors">09816021084</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#0EA5E9]" />
                <a href="mailto:bakhtawar.singh646@gmail.com" className="hover:text-white transition-colors">bakhtawar.singh646@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <div className="glass-card border border-slate-700/60 bg-slate-900/90 rounded-[24px] p-6 md:p-8 shadow-soft">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E1306C] to-[#8B5CF6] flex items-center justify-center shadow-soft-lg">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-[#A5B4FC]">Social contact</p>
                  <h3 className="text-2xl font-semibold text-white">Follow us on Instagram</h3>
                </div>
              </div>
              <a
                href="https://www.instagram.com/sr_properties_hp/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#E1306C] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 shadow-lg shadow-[#E1306C]/20 hover:bg-[#C026D3]"
              >
                Contact Us
              </a>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-300 max-w-2xl">
              Stay updated with the latest property listings, success stories, and market insights from Kalra Property.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-700/50 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} S.R Properties & Builders. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// ============== FLOATING WHATSAPP BUTTON ==============
const FloatingWhatsApp = () => {
  return (
    <a
      data-testid="floating-whatsapp-btn"
      href="https://wa.me/919816021084"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform whatsapp-pulse"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
};

// ============== HOME PAGE ==============
const Home = () => {
  const properties = [
    {
      id: 1,
      title: "2 BHK + Attic Flat in HIMUDA Colony, Vikas Nagar, Shimla",
      price: "Contact for Price",
      location: "Shimla, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
      description: "A well-maintained and spacious 2 BHK flat with an attic located in the prime area of HIMUDA Colony, Vikas Nagar, Shimla. The property includes 3 bedrooms (including attic space), 2 bathrooms, a fully functional kitchen, and receives ample sunlight throughout the day. The flat offers convenient drive-in access with on-road parking available. Ideal for families looking for a comfortable and well-connected residential space in Shimla.",
      features: ["2 BHK + Attic (3 usable rooms)", "2 Bathrooms", "Fully functional kitchen", "Full-day sunlight", "Drive-in access", "On-road parking", "Prime residential location"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <PropertiesSection />
      <EMICalculatorSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
      <Toaster position="top-center" richColors />
    </div>
  );
};

// ============== APP COMPONENT ==============
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="contact" element={<ContactFormPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
