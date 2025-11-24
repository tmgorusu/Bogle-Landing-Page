import React, { useState, useEffect, useRef } from "react";
import "./Homepage.css";
import Logo from "./assets/Logo.png";

const Homepage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // Set up intersection observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    // Observe all sections
    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => observerRef.current.observe(section));

    // Handle scroll for scroll-to-top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          setMobileMenuOpen(false); // Close mobile menu if open
        }
      });
    });

    // Animate counters when hero becomes visible
    setTimeout(() => {
      const counters = document.querySelectorAll(".animated-counter");
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"));
        const isPercentage = counter.textContent.includes("%");
        const isDollar = counter.textContent.includes("$");
        const isTime = counter.textContent.includes("min");

        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }

          let displayValue = Math.floor(current);
          if (isPercentage) displayValue += "%";
          else if (isDollar) displayValue = "$" + displayValue;
          else if (isTime) displayValue += "min";

          counter.textContent = displayValue;
        }, 40);
      });
    }, 1000);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo">
            <img src={Logo} alt="Bogle" />
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">
            <a
              href="https://dashboard.boglepay.com/login"
              className="nav-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Login
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${mobileMenuOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-nav-links">
            <a
              href="https://dashboard.boglepay.com/login"
              className="mobile-nav-cta"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </a>
          </div>
        </div>
      </nav>

      <div className="full-container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className={`hero-title ${isVisible ? "animate-in" : ""}`}>
                Better Payments for
                <span className="hero-title-accent"> Modern Businesses</span>
              </h1>
              <p className={`hero-subtitle ${isVisible ? "animate-in" : ""}`}>
                Bogle is rebuilding payments by giving small businesses the same pricing, speed, and reliability usually reserved for large enterprises. We are rebuilding payments from the ground up with transparent costs, next-generation rails, and support that's human.
                <br /><br />
                We give EVERY merchant the tools they need to accept money effortlessly.
              </p>
              <div className={`hero-actions ${isVisible ? "animate-in" : ""}`}>
                <a
                  href="mailto:general@boglepay.com"
                  className="btn-primary"
                >
                  Interested? Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-content">
              <div className="footer-brand">
                <img src={Logo} alt="Bogle" className="footer-logo" />
                <p className="footer-tagline">
                  Smart payments for modern businesses
                </p>
              </div>
              <div className="footer-links">
                <div className="footer-section">
                  <h4>Product</h4>
                  <a href="/">Home</a>
                </div>
                <div className="footer-section">
                  <h4>Support</h4>
                  <a href="mailto:general@boglepay.com">Contact Us</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2025 Bogle. All rights reserved.</p>
              <div className="footer-legal">
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/terms-of-service">Terms of Service</a>
                <a href="/security">Security</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Cookie/Privacy Banner */}
        {showCookieBanner && (
          <div className="cookie-banner">
            <div className="cookie-content">
              <p>
                We use cookies to enhance your experience and analyze site
                usage. By continuing to use our site, you agree to our{" "}
                <a href="/privacy-policy">Privacy Policy</a> and{" "}
                <a href="/terms-of-service">Terms of Service</a>.
              </p>
              <div className="cookie-actions">
                <button
                  className="cookie-accept"
                  onClick={() => setShowCookieBanner(false)}
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            className="scroll-to-top"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Homepage;
