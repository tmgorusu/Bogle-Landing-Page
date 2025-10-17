import React, { useState, useEffect } from "react";
import "./FeeStructure.css";
import Logo from "./assets/Logo.png";

const FeeStructure = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [monthlyVolume, setMonthlyVolume] = useState(10000);
  const [currentRate, setCurrentRate] = useState(2.9);
  const [calculations, setCalculations] = useState({
    currentFees: 290,
    bogleFees: 50,
    monthlySavings: 240,
    annualSavings: 2880
  });

  const fullText = "Start saving for free...";

  useEffect(() => {
    setIsVisible(true);
    document.title = "Fee Structure - Bogle Pay";
  }, []);

  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100); // 100ms delay between characters

    return () => clearInterval(typeInterval);
  }, [fullText]);

  const calculateSavings = (volume, rate) => {
    const currentFees = (volume * rate / 100) + (volume * 0.003); // 2.9% + 30¢ per transaction
    const bogleFees = (volume * 0.5 / 100) + (volume * 0.0025); // 0.5% + 25¢ per transaction
    const monthlySavings = currentFees - bogleFees;
    const annualSavings = monthlySavings * 12;

    return {
      currentFees: Math.round(currentFees),
      bogleFees: Math.round(bogleFees),
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings)
    };
  };

  const handleVolumeChange = (e) => {
    const volume = parseFloat(e.target.value) || 0;
    setMonthlyVolume(volume);
    const newCalculations = calculateSavings(volume, currentRate);
    setCalculations(newCalculations);
  };

  const handleRateChange = (e) => {
    const rate = parseFloat(e.target.value) || 0;
    setCurrentRate(rate);
    const newCalculations = calculateSavings(monthlyVolume, rate);
    setCalculations(newCalculations);
  };

  return (
    <div className="fee-structure-page">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo">
            <a href="/">
              <img src={Logo} alt="Bogle" />
            </a>
          </div>
          
          <div className="nav-links desktop-nav">
            <a href="/" className="nav-link">
              Home
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

      <div className="fee-structure-container">
        {/* Header Section */}
        <section className="fee-header">
          <div className={`header-content ${isVisible ? "animate-in" : ""}`}>
            <h1 className="page-title">
              <span className="type-animation">{displayedText}<span className="cursor">|</span></span>
            </h1>
            <p className="page-subtitle">
              Transparent pricing with no hidden fees. Choose the payment method that works best for your business. Contact us for custom rates.
            </p>
          </div>
        </section>

        {/* Fee Comparison Table */}
        <section className="fee-comparison">
          <div className="comparison-container">
            <h2 className="section-title">Payment Processing Fees</h2>
            <p className="section-subtitle">
              Compare our competitive rates across all payment methods
            </p>
            
            <div className="fee-table-container">
              <table className="fee-table">
                <thead>
                  <tr>
                    <th>Payment Method</th>
                    <th>Processing Fee</th>
                    <th>Transaction Fee</th>
                    <th>Monthly Fee</th>
                    <th>Setup Fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="fee-row">
                    <td className="method-cell">
                      <div className="method-info">
                        <div>
                          <div className="method-name">Credit Cards</div>
                          <div className="method-description">Visa, Mastercard, Amex, Discover</div>
                        </div>
                      </div>
                    </td>
                    <td className="fee-cell primary">2.9%</td>
                    <td className="fee-cell">$0.30</td>
                    <td className="fee-cell">$0</td>
                    <td className="fee-cell">$0</td>
                    <td className="features-cell">
                      <div className="features-content">
                        <p>All major credit cards accepted with advanced fraud protection and real-time processing. Includes comprehensive chargeback protection to keep your business secure.</p>
                      </div>
                    </td>
                  </tr>
                  <tr className="fee-row featured">
                    <td className="method-cell">
                      <div className="method-info">
                        <div>
                          <div className="method-name">ACH Transfers</div>
                          <div className="method-description">Direct bank transfers</div>
                        </div>
                      </div>
                    </td>
                    <td className="fee-cell primary savings">0.5%</td>
                    <td className="fee-cell">$0.25</td>
                    <td className="fee-cell">$0</td>
                    <td className="fee-cell">$0</td>
                    <td className="features-cell">
                      <div className="features-content">
                        <p>Lowest processing fees with comprehensive account verification and reduced chargeback risk. Credit card backup required for purchases over $1,000 for additional security.</p>
                      </div>
                    </td>
                  </tr>
                  <tr className="fee-row">
                    <td className="method-cell">
                      <div className="method-info">
                        <div>
                          <div className="method-name">Cryptocurrency</div>
                          <div className="method-description">Bitcoin, Ethereum, USDC</div>
                        </div>
                      </div>
                    </td>
                    <td className="fee-cell primary">1.0%</td>
                    <td className="fee-cell">$0.25</td>
                    <td className="fee-cell">$0</td>
                    <td className="fee-cell">$0</td>
                    <td className="features-cell">
                      <div className="features-content">
                        <p>Zero chargeback risk with instant settlement and multiple cryptocurrency options. Receive all payments in USD to avoid crypto volatility while maintaining the security benefits.</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>



        {/* Savings Calculator */}
        <section className="savings-calculator">
          <div className="calculator-container">
            <h2 className="section-title">Calculate Your Savings</h2>
            <p className="section-subtitle">
              See how much you could save by switching to Bogle Pay
            </p>
            
            <div className="calculator-card">
              <div className="calculator-inputs">
                <div className="input-group">
                  <label htmlFor="monthly-volume">Monthly Processing Volume</label>
                  <div className="input-wrapper">
                    <span className="currency-symbol">$</span>
                    <input 
                      type="number" 
                      id="monthly-volume" 
                      placeholder="10000" 
                      value={monthlyVolume}
                      onChange={handleVolumeChange}
                      min="0"
                      step="100"
                    />
                  </div>
                </div>
                
                <div className="input-group">
                  <label htmlFor="current-rate">Current Processing Rate</label>
                  <div className="input-wrapper">
                    <input 
                      type="number" 
                      id="current-rate" 
                      placeholder="2.9" 
                      value={currentRate}
                      onChange={handleRateChange}
                      min="0"
                      max="10"
                      step="0.1"
                    />
                    <span className="percentage-symbol">%</span>
                  </div>
                </div>
              </div>
              
              <div className="calculator-results">
                <div className="result-item">
                  <span className="result-label">Current Monthly Fees:</span>
                  <span className="result-value current">${calculations.currentFees.toLocaleString()}</span>
                </div>
                <div className="result-item">
                  <span className="result-label">With Bogle ACH:</span>
                  <span className="result-value savings">${calculations.bogleFees.toLocaleString()}</span>
                </div>
                <div className="result-item total">
                  <span className="result-label">Monthly Savings:</span>
                  <span className="result-value total-savings">${calculations.monthlySavings.toLocaleString()}</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Annual Savings:</span>
                  <span className="result-value annual-savings">${calculations.annualSavings.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Home Section */}
        <section className="back-to-home">
          <div className="back-container">
            <a href="/" className="btn-secondary">
              Back to Home
            </a>
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
                  <a href="/#payment-options">Payment Options</a>
                  <a href="/#services">Services</a>
                  <a href="/#discount-strategy">Pricing</a>
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

export default FeeStructure;
