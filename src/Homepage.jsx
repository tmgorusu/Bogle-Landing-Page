import React, { useState, useEffect, useRef } from "react";
import "./Homepage.css";
import Logo from "./assets/Logo.png";
import { API_URL } from "./config";

const Homepage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const observerRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

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

    // Animate counters when hero becomes visible
    setTimeout(() => {
      const counters = document.querySelectorAll('.animated-counter');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const isPercentage = counter.textContent.includes('%');
        const isDollar = counter.textContent.includes('$');
        const isTime = counter.textContent.includes('min');

        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }

          let displayValue = Math.floor(current);
          if (isPercentage) displayValue += '%';
          else if (isDollar) displayValue = '$' + displayValue;
          else if (isTime) displayValue += 'min';

          counter.textContent = displayValue;
        }, 40);
      });
    }, 1000);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setSubmitMessage("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch(`${API_URL}/api/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setWaitlistSubmitted(true);
        setEmail("");
        setSubmitMessage(data.message);
        setTimeout(() => {
          setWaitlistSubmitted(false);
          setSubmitMessage("");
        }, 5000);
      } else {
        setSubmitMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      setSubmitMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo">
            <img src={Logo} alt="Bogle" />
          </div>
          <div className="nav-links">
            <a href="#payment-options" className="nav-link">
              Payment Options
            </a>
            <a href="#discount-strategy" className="nav-link">
              Pricing
            </a>
            <a href="#services" className="nav-link">
              Services
            </a>
            

            <button
              className="nav-cta"
              onClick={() =>
                document
                  .getElementById("waitlist")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </nav>

      <div className="full-container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <div className={`hero-badge ${isVisible ? "animate-in" : ""}`}>
                <span className="badge-text">🚀 Launching Soon</span>
              </div>
              <h1 className={`hero-title ${isVisible ? "animate-in" : ""}`}>
                Smart Payments for
                <span className="hero-title-accent"> Modern Businesses</span>
              </h1>
              <p className={`hero-subtitle ${isVisible ? "animate-in" : ""}`}>
                Create more ways to pay while saving costs both ways.
              </p>
              <div className={`hero-actions ${isVisible ? "animate-in" : ""}`}>
                <button
                  className="btn-primary"
                  onClick={() =>
                    document
                      .getElementById("waitlist")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Get Early Access
                </button>
              </div>
              <div className={`hero-stats ${isVisible ? "animate-in" : ""}`}>
                <div className="stat">
                  <span className="stat-number animated-counter" data-target="80">0%</span>
                  <span className="stat-label">Lower fees</span>
                  <div className="stat-progress">
                    <div className="progress-bar" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="stat">
                  <span className="stat-number animated-counter" data-target="0">$0</span>
                  <span className="stat-label">Setup costs</span>
                  <div className="stat-progress">
                    <div className="progress-bar" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="stat">
                  <span className="stat-number animated-counter" data-target="5">0min</span>
                  <span className="stat-label">Setup time</span>
                  <div className="stat-progress">
                    <div className="progress-bar" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className={`savings-showcase ${isVisible ? 'animate-showcase' : ''}`}>
                <div className="savings-header">
                  <span className="showcase-label">
                    Monthly Payment Processing
                  </span>
                </div>

                <div className="savings-comparison">
                  <div className="cost-display before animate-cost-before">
                    <div className="cost-label">Before Bogle</div>
                    <div className="cost-amount">$2,900</div>
                    <div className="cost-detail">Credit card fees</div>
                  </div>

                  <div className="savings-arrow animate-arrow">
                    <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                      <path
                        d="M2 10H38M38 10L32 4M38 10L32 16"
                        stroke="#22c55e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="arrow-path"
                      />
                    </svg>
                  </div>

                  <div className="cost-display after animate-cost-after">
                    <div className="cost-label">With Bogle</div>
                    <div className="cost-amount savings pulse-savings">$580</div>
                    <div className="cost-detail">ACH + crypto mix</div>
                  </div>
                </div>

                <div className="savings-summary animate-summary">
                  <div className="savings-amount">
                    <span className="save-label">You save</span>
                    <span className="save-value glow-text">&nbsp;$2,320&nbsp;</span>
                    <span className="save-period">per month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Options Section */}
        <section className="payment-options" id="payment-options" data-animate>
          <div className="payment-options-container">
            <div className={`section-header ${visibleSections.has('payment-options') ? 'animate-slide-up' : ''}`}>
              <h2 className="section-title">Choose Your Payment Method</h2>
              <p className="section-subtitle">
                Multiple options to fit your business needs and customer
                preferences
              </p>
            </div>
            <div className={`payment-methods-grid ${visibleSections.has('payment-options') ? 'animate-stagger-cards' : ''}`}>
              <div className="payment-method-card animate-card" data-delay="0">
                <div className="method-icon-container">
                  <div className="method-icon credit-card pulse-icon">💳</div>
                </div>
                <div className="method-header">
                  <h3 className="method-title">Credit Cards</h3>
                  <p className="method-subtitle">Powered by Stripe</p>
                </div>
                <div className="method-rate">
                  <span className="rate-number">2.9%</span>
                  <span className="rate-detail">+ 30¢ per transaction</span>
                </div>
                <div className="method-content">
                  <div className="method-features">
                    <div className="feature-item">
                      <span className="feature-icon">⚡</span>
                      <span>Industry-leading processing with Stripe</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🔗</span>
                      <span>Seamless integration into your system</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🛡️</span>
                      <span>Advanced fraud protection</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🌐</span>
                      <span>Global acceptance and recognition</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="payment-method-card featured animate-card" data-delay="200">
                <div className="featured-badge bounce-badge">Best Value</div>
                <div className="method-icon-container">
                  <div className="method-icon ach pulse-icon">🏦</div>
                </div>
                <div className="method-header">
                  <h3 className="method-title">ACH</h3>
                  <p className="method-subtitle">Direct bank transfers</p>
                </div>
                <div className="method-rate">
                  <span className="rate-number">0.5%</span>
                  <span className="rate-detail">+ 25¢ per transaction</span>
                </div>
                <div className="method-content">
                  <div className="method-features">
                    <div className="feature-item">
                      <span className="feature-icon">💰</span>
                      <span>Lower fees and reduced chargeback risk</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🔐</span>
                      <span>Pre-payment account and balance verification</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🛡️</span>
                      <span>Credit card backup for purchases over $1,000</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🔄</span>
                      <span>Lower bounce rates than credit card chargebacks</span>
                    </div>
                  </div>
                  <div className="method-extras">
                    <div className="savings-badge">Save up to 80%</div>
                  </div>
                </div>
              </div>

              <div className="payment-method-card animate-card" data-delay="400">
                <div className="method-icon-container">
                  <div className="method-icon crypto pulse-icon">₿</div>
                </div>
                <div className="method-header">
                  <h3 className="method-title">Cryptocurrency</h3>
                  <p className="method-subtitle">Digital payments</p>
                </div>
                <div className="method-rate">
                  <span className="rate-number">0.75%</span>
                  <span className="rate-detail">No fixed fee</span>
                </div>
                <div className="method-content">
                  <div className="method-features">
                    <div className="feature-item">
                      <span className="feature-icon">🚫</span>
                      <span>Completely eliminate chargeback risk</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">⚡</span>
                      <span>Irreversible payments received instantly</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🪙</span>
                      <span>Multiple top tokens and coins accepted</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">💵</span>
                      <span>Receive payments in USD, no crypto volatility</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-width risk explanations */}
            <div className="risk-explanations-container">
              <div className="risk-explanation">
                <div className="risk-header">
                  <span className="risk-icon">🛡️</span>
                  <h4>Why ACH </h4>
                </div>
                <div className="risk-content">
                  <p>ACH includes comprehensive verification and authorization processes that significantly reduce chargeback risk:</p>
                  <ul className="risk-features">
                    <li><strong>Account Verification:</strong> We verify the customer's bank account and available balance before processing</li>
                    <li><strong>Authorization Checks:</strong> Multiple authorization layers ensure legitimate transactions</li>
                    <li><strong>Credit Card Backup:</strong> For purchases over $1,000, we require a credit card on file as additional security</li>
                    <li><strong>Risk Reduction:</strong> While these measures significantly reduce chargeback risk, they don't eliminate it entirely</li>
                  </ul>
                </div>
              </div>
              <div className="risk-explanation">
                <div className="risk-header">
                  <span className="risk-icon">🔒</span>
                  <h4>Why Crypto</h4>
                </div>
                <div className="risk-content">
                  <p>Cryptocurrency payments provide the highest level of chargeback protection available:</p>
                  <ul className="risk-features">
                    <li><strong>Irreversible Transactions:</strong> Once confirmed on the blockchain, crypto payments cannot be reversed</li>
                    <li><strong>No Chargeback Mechanism:</strong> Unlike credit cards, there's no way for customers to dispute completed crypto transactions</li>
                    <li><strong>Instant Finality:</strong> Payments are final upon confirmation, eliminating fraud risk entirely</li>
                    <li><strong>Complete Protection:</strong> This is the only payment method that completely eliminates chargeback fraud</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Discount Strategy Section */}
        <section className="discount-strategy" id="discount-strategy" data-animate>
          <div className="discount-strategy-container">
            <div className={`section-header ${visibleSections.has('discount-strategy') ? 'animate-slide-up' : ''}`}>
              <h2 className="section-title">How Smart Discounts Work (and Save Everyone Money)</h2>

              <div className="optional-disclaimer">
                <p className="disclaimer-text">
                  <strong>Your business chooses whether and how much to offer—completely optional and customizable</strong>
                </p>
              </div>
              <div className="strategy-explanation">
                <p className="explanation-text">
                  <strong>Here’s how it works:</strong> You know that credit
                  card fees are high. Bogle lets you offer customers a small
                  discount if they choose to pay with lower-cost options like
                  ACH or Crypto. This optional discount makes them feel
                  smart for choosing a better deal, and it directly reduces your
                  processing fees. You decide the discount, or if you want to
                  offer one at all. It's a win-win: your customers save money,
                  and you increase your profit on every sale.
                </p>
              </div>
            </div>
            <div className={`discount-comparison ${visibleSections.has('discount-strategy') ? 'animate-comparison-cards' : ''}`}>
              <div className="comparison-card animate-comparison-card" data-delay="0">
                <div className="comparison-header">
                  <h3>Credit Cards</h3>
                  <div className="discount-badge cc-fee">
                    Standard Processing
                  </div>
                </div>
                <div className="comparison-breakdown">
                  <div className="breakdown-item">
                    <span className="label">Original price:</span>
                    <span className="value">$100.00</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Savings for your customers:</span>
                    <span className="value">$0.00 (no discount offered)</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Processing cost to you:</span>
                    <span className="value">$3.20 (2.9% + 30¢)</span>
                  </div>
                  <div className="breakdown-item total">
                    <span className="label">Your net revenue:</span>
                    <span className="value">$96.80</span>
                  </div>
                  <div className="combined-savings">
                    <div className="total-impact">
                      <span className="impact-label">Total Combined Savings:</span>
                      <span className="impact-value">$0.00</span>
                    </div>
                    <div className="impact-breakdown">
                      <span className="business-impact">Business: $0.00</span>
                      <span className="customer-impact">Customer: $0.00</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="comparison-card featured animate-comparison-card" data-delay="200">
                <div className="featured-badge shimmer-badge">Best Value</div>
                <div className="comparison-header">
                  <h3>ACH with Optional Discount</h3>
                  <div className="discount-badge ach-discount">
                    Example: 2% Customer Discount
                  </div>
                </div>
                <div className="comparison-breakdown">
                  <div className="breakdown-item">
                    <span className="label">Original price:</span>
                    <span className="value">$100.00</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Savings for your customers:</span>
                    <span className="value">$2.00 (2% discount you choose to offer)</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Processing cost to you:</span>
                    <span className="value">$0.74 (0.5% + 25¢)</span>
                  </div>
                  <div className="breakdown-item total">
                    <span className="label">Your net revenue:</span>
                    <span className="value">$97.26</span>
                  </div>
                  <div className="combined-savings">
                    <div className="total-impact">
                      <span className="impact-label">Total Combined Savings:</span>
                      <span className="impact-value">$2.46</span>
                    </div>
                    <div className="impact-breakdown">
                      <span className="business-impact">Savings for your business: $0.46 vs credit cards</span>
                      <span className="customer-impact">Savings for your customers: $2.00</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="comparison-card animate-comparison-card" data-delay="400">
                <div className="comparison-header">
                  <h3>Crypto with Optional Discount</h3>
                  <div className="discount-badge crypto-discount">
                    Example: 1.5% Customer Discount
                  </div>
                </div>
                <div className="comparison-breakdown">
                  <div className="breakdown-item">
                    <span className="label">Original price:</span>
                    <span className="value">$100.00</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Savings for your customers:</span>
                    <span className="value">
                      $1.50 (1.5% discount you choose to offer)
                    </span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Processing cost to you:</span>
                    <span className="value">$0.75 (0.75%)</span>
                  </div>
                  <div className="breakdown-item total">
                    <span className="label">Your net revenue:</span>
                    <span className="value">$97.75</span>
                  </div>
                  <div className="combined-savings">
                    <div className="total-impact">
                      <span className="impact-label">Total Combined Savings:</span>
                      <span className="impact-value">$2.45</span>
                    </div>
                    <div className="impact-breakdown">
                      <span className="business-impact">Savings for your business: $0.95 vs credit cards</span>
                      <span className="customer-impact">Savings for your customers: $1.50</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 
            <div className="discount-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">💰</span>
                <div className="benefit-content">
                  <h4>Reduce Your Fees</h4>
                  <p>Lower processing costs mean higher profit margins</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🛡️</span>
                <div className="benefit-content">
                  <h4>Prevent Chargebacks</h4>
                  <p>
                    ACH and crypto eliminate chargeback risk entirely
                  </p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">😊</span>
                <div className="benefit-content">
                  <h4>Improve Customer Experience</h4>
                  <p>
                    Give customers more payment options and potential savings
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </section>

        {/* What We Do Differently Section */}
        <section className="differentiators">
          <div className="differentiators-container">
            <div className="section-header">
              <h2 className="section-title">What Makes Bogle Different</h2>
              <p className="section-subtitle">
                Bogle gives small businesses the tools to offer payment choices that reduce fees—for themselves and their customers
              </p>
            </div>
            <div className="differentiators-grid">
              <div className="differentiator-card">
                <div className="diff-number">01</div>
                <div className="diff-content">
                  <h3>Complete Price Transparency</h3>
                  <p>
                    No hidden fees, no surprises, no upfront costs. You only pay
                    when you process payments. Every fee is clearly outlined
                    upfront.
                  </p>
                </div>
              </div>
              <div className="differentiator-card">
                <div className="diff-number">02</div>
                <div className="diff-content">
                  <h3>Frictionless ACH Experience</h3>
                  <p>
                    Seamless bank payments as easy as credit cards—no clunky account number entry or long verification delays.
                  </p>
                </div>
              </div>
              <div className="differentiator-card">
                <div className="diff-number">03</div>
                <div className="diff-content">
                  <h3>Versatile Payments in One Place</h3>
                  <p>
                    Accept ACH, credit cards, and crypto with one platform, giving merchants and customers flexible options.
                  </p>
                </div>
              </div>
              <div className="differentiator-card">
                <div className="diff-number">04</div>
                <div className="diff-content">
                  <h3>Built for Business Growth</h3>
                  <p>
                    Powerful plug-and-play integrations (Shopify, QuickBooks), real-time fraud protection, and growth tools like cash-back incentives drive adoption and retention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Combined Services and Integrations Section */}
        <section className="services" id="services" data-animate>
          <div className="services-container">
            <div className={`section-header ${visibleSections.has('services') ? 'animate-slide-up' : ''}`}>
              <h2 className="section-title">Complete Payment Solutions & Integrations</h2>
              <p className="section-subtitle">
                Everything you need to streamline payments and connect with your favorite tools
              </p>
            </div>
            <div className={`services-grid ${visibleSections.has('services') ? 'animate-grid-items' : ''}`}>
              <div className="service-card animate-service-card" data-delay="0">

                <h3 className="service-title">Smart Invoicing</h3>
                <p className="service-description">
                  Send beautiful digital invoices with multiple payment options and automatic reminders
                </p>
                <ul className="service-features">
                  <li>Customizable templates</li>
                  <li>Multi-payment option display</li>
                  <li>Real-time payment tracking</li>
                </ul>
              </div>

              <div className="service-card animate-service-card" data-delay="100">

                <h3 className="service-title">Shopify Integration</h3>
                <p className="service-description">
                  One-click integration with native checkout and automatic order sync
                </p>
                <ul className="service-features">
                  <li>Native checkout experience</li>
                  <li>Multiple payment options</li>
                  <li>Real-time status updates</li>
                </ul>
              </div>

              <div className="service-card animate-service-card" data-delay="200">

                <h3 className="service-title">Website Integration</h3>
                <p className="service-description">
                  Developer-friendly API with customizable widgets and comprehensive docs
                </p>
                <ul className="service-features">
                  <li>RESTful API and SDKs</li>
                  <li>Customizable payment widgets</li>
                  <li>Webhook notifications</li>
                </ul>
              </div>

              <div className="service-card animate-service-card" data-delay="300">

                <h3 className="service-title">QuickBooks Integration</h3>
                <p className="service-description">
                  Automatic transaction sync and simplified accounting management
                </p>
                <ul className="service-features">
                  <li>Automatic transaction sync</li>
                  <li>Simplified accounting</li>
                  <li>Real-time reconciliation</li>
                </ul>
              </div>

              <div className="service-card animate-service-card" data-delay="400">

                <h3 className="service-title">Mobile & QR Payments</h3>
                <p className="service-description">
                  Accept payments on-the-go with QR codes and mobile-optimized links
                </p>
                <ul className="service-features">
                  <li>QR code generation</li>
                  <li>Mobile-optimized checkout</li>
                  <li>Text and email payment links</li>
                </ul>
              </div>

              <div className="service-card animate-service-card" data-delay="500">

                <h3 className="service-title">Analytics & Reporting</h3>
                <p className="service-description">
                  Track customer behavior, payment patterns, and detailed transaction analytics
                </p>
                <ul className="service-features">
                  <li>Customer spend patterns</li>
                  <li>Payment method analytics</li>
                  <li>Transaction reporting</li>
                </ul>
              </div>
            </div>
          </div>
        </section>


        {/* Combined CTA and Waitlist Section */}
        <section className="cta-waitlist" id="waitlist">
          <div className="cta-waitlist-container">
            <div className="cta-waitlist-content">
              <h2 className="section-title">Ready to Transform Your Business?</h2>
              <p className="section-subtitle">
                Join our first group of businesses reducing costs and expanding payment options for customers with Bogle.
              </p>

              <form className="waitlist-form" onSubmit={handleWaitlistSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="email-input"
                    required
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    className={`waitlist-button ${isSubmitting ? 'loading' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Joining...
                      </>
                    ) : waitlistSubmitted ? (
                      "✓ Added!"
                    ) : (
                      "Join Waitlist"
                    )}
                  </button>
                </div>
                <p className="waitlist-note">
                  Get early access • No spam, ever • Unsubscribe anytime
                </p>
              </form>

              {submitMessage && (
                <div className={`message ${waitlistSubmitted ? 'success-message' : 'error-message'}`}>
                  <span className="message-icon">
                    {waitlistSubmitted ? '🎉' : '⚠️'}
                  </span>
                  <span>{submitMessage}</span>
                </div>
              )}

              <div className="cta-benefits">
                <span>✓ No setup fees</span>
                <span>✓ No upfront costs</span>
                <span>✓ Cancel anytime</span>
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
                  <a href="#payment-options">Payment Options</a>
                  <a href="#services">Services</a>
                  <a href="#discount-strategy">Pricing</a>
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
                We use cookies to enhance your experience and analyze site usage.
                By continuing to use our site, you agree to our{' '}
                <a href="/privacy-policy">Privacy Policy</a> and{' '}
                <a href="/terms-of-service">Terms of Service</a>.
              </p>
              <div className="cookie-actions">
                <button
                  className="cookie-accept"
                  onClick={() => setShowCookieBanner(false)}
                >
                  Accept All
                </button>
                <button
                  className="cookie-decline"
                  onClick={() => setShowCookieBanner(false)}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
