import React, { useState, useEffect } from "react";
import "./Services.css";
import Logo from "./assets/Logo.png";

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const observerRef = React.useRef(null);

  useEffect(() => {
    setIsVisible(true);
    document.title = "Services - Bogle Pay";

    // Set up intersection observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observerRef.current.observe(section));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="services-page">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo">
            <a href="/">
              <img src={Logo} alt="Bogle" />
            </a>
          </div>
          
          <div className="nav-links desktop-nav">
            <a href="/fee-structure" className="nav-link">
              Fee Structure
            </a>
            <a href="/services" className="nav-link">
              Services
            </a>
            <a href="/#waitlist" className="nav-cta">
              Join Waitlist
            </a>
          </div>
        </div>
      </nav>

      <div className="services-container">
        {/* Header Section */}
        <section className="services-header">
          <div className={`header-content ${isVisible ? "animate-in" : ""}`}>
            <h1 className="page-title">Complete Payment Solutions</h1>
          </div>
        </section>

        {/* Value Proposition 1: Frictionless */}
        <section className="value-prop-section" data-animate>
          <div className="value-prop-container">
            <div className={`value-prop-content ${visibleSections.has('value-prop-section') ? 'animate-slide-up' : ''}`}>
              <div className="value-prop-header">
                <h2 className="value-prop-title">Frictionless Payments</h2>
                <p className="value-prop-subtitle">
                  Seamless payment experiences that convert better and cost less
                </p>
              </div>
              <div className="value-prop-features">
                <div className="feature-card">
                  <h3>Smart Invoicing</h3>
                  <p>Send digital invoices with multiple payment options and automatic reminders.</p>
                  <ul>
                    <li>Customizable templates</li>
                    <li>Multi-payment options</li>
                    <li>Real-time tracking</li>
                    <li>Automatic reminders</li>
                  </ul>
                </div>
                <div className="feature-card">
                  <h3>Mobile & QR Payments</h3>
                  <p>Accept payments anywhere with QR codes and mobile-optimized links.</p>
                  <ul>
                    <li>Instant QR code generation</li>
                    <li>Mobile-optimized checkout</li>
                    <li>Text and email payment links</li>
                    <li>Contactless payment options</li>
                  </ul>
                </div>
                <div className="feature-card">
                  <h3>Analytics & Reporting</h3>
                  <p>Track customer behavior and payment patterns to optimize your revenue.</p>
                  <ul>
                    <li>Customer spend analysis</li>
                    <li>Payment method metrics</li>
                    <li>Real-time reporting</li>
                    <li>Custom dashboards</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition 2: Business-Specific */}
        <section className="value-prop-section business-specific" data-animate>
          <div className="value-prop-container">
            <div className={`value-prop-content ${visibleSections.has('business-specific') ? 'animate-slide-up' : ''}`}>
              <div className="value-prop-header">
                <h2 className="value-prop-title">Designed for Your Business</h2>
                <p className="value-prop-subtitle">
                  Custom integrations and tools that fit your specific workflow
                </p>
              </div>
              <div className="value-prop-features">
                <div className="feature-card">
                  <h3>Shopify Integration</h3>
                  <p>One-click integration with native checkout and automatic order sync.</p>
                  <ul>
                    <li>Native checkout experience</li>
                    <li>Multiple payment options</li>
                    <li>Real-time order updates</li>
                    <li>Automatic inventory sync</li>
                  </ul>
                </div>
                <div className="feature-card">
                  <h3>Website Integration</h3>
                  <p>Developer-friendly API with customizable widgets and comprehensive documentation.</p>
                  <ul>
                    <li>RESTful API and SDKs</li>
                    <li>Customizable payment widgets</li>
                    <li>Webhook notifications</li>
                    <li>Developer documentation</li>
                  </ul>
                </div>
                <div className="feature-card">
                  <h3>QuickBooks Integration</h3>
                  <p>Automatic transaction sync and simplified accounting management.</p>
                  <ul>
                    <li>Automatic transaction sync</li>
                    <li>Simplified accounting workflow</li>
                    <li>Real-time reconciliation</li>
                    <li>Tax reporting automation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition 3: Personal Agents */}
        <section className="value-prop-section personal-agents" data-animate>
          <div className="value-prop-container">
            <div className={`value-prop-content ${visibleSections.has('personal-agents') ? 'animate-slide-up' : ''}`}>
              <div className="value-prop-header">
                <h2 className="value-prop-title">Personal Agents to Help</h2>
                <p className="value-prop-subtitle">
                  Dedicated support team that understands your business and helps you succeed
                </p>
              </div>
              <div className="value-prop-features">
                <div className="feature-card">
                  <h3>Dedicated Account Manager</h3>
                  <p>Get a personal sales rep who understands your business and payment needs.</p>
                  <ul>
                    <li>One-on-one relationship</li>
                    <li>Business-specific expertise</li>
                    <li>Ongoing consultation</li>
                    <li>Regular business reviews</li>
                  </ul>
                </div>
                <div className="feature-card">
                  <h3>Custom Implementation</h3>
                  <p>Tailored setup and integration assistance for your specific requirements.</p>
                  <ul>
                    <li>Personalized onboarding</li>
                    <li>Custom integration development</li>
                    <li>Workflow optimization</li>
                    <li>Staff training</li>
                  </ul>
                </div>
                <div className="feature-card">
                  <h3>Priority Support</h3>
                  <p>Direct line to your rep for quick resolution of any issues or questions.</p>
                  <ul>
                    <li>24/7 priority support</li>
                    <li>Direct communication channels</li>
                    <li>Performance optimization</li>
                    <li>Issue escalation tracking</li>
                  </ul>
                </div>
              </div>
              <div className="value-prop-cta">
                <a href="mailto:general@boglepay.com" className="btn-primary">
                  Contact Sales Team
                </a>
                <p className="cta-note">Available for businesses processing $10K+ monthly</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="services-cta">
          <div className="cta-container">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-subtitle">
              Join our waitlist and be among the first to experience our comprehensive payment solutions.
            </p>
            <div className="cta-actions">
              <a href="/#waitlist" className="btn-primary">
                Join Waitlist
              </a>
              <a href="/" className="btn-secondary">
                Back to Home
              </a>
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
                  <a href="/#services">Services</a>
                  <a href="/fee-structure">Fee Structure</a>
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
      </div>
    </div>
  );
};

export default Services;
