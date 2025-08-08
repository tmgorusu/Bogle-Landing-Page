import React from "react";
import "./Homepage.css";
import Logo from "./assets/Logo.png";

const TermsOfService = () => {
  return (
    <div className="legal-page">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo">
            <img src={Logo} alt="Bogle" />
          </div>
          <div className="nav-links">
            <a href="/" className="nav-link">
              Home
            </a>
          </div>
        </div>
      </nav>

      <div className="legal-container">
        <div className="legal-content">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last updated: January 2024</p>

          <section>
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using Bogle's services, you accept and agree to be bound by the terms 
              and provision of this agreement.
            </p>
          </section>

          <section>
            <h2>Description of Service</h2>
            <p>
              Bogle provides payment processing services that allow businesses to accept multiple 
              payment methods including credit cards, bank transfers, and cryptocurrency payments.
            </p>
          </section>

          <section>
            <h2>User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Use our services only for legitimate business purposes</li>
              <li>Not engage in fraudulent or illegal activities</li>
            </ul>
          </section>

          <section>
            <h2>Payment Terms</h2>
            <p>
              Our fees are clearly outlined in your service agreement. We reserve the right to 
              modify our fees with 30 days' notice. All payments are processed securely through 
              our trusted payment partners.
            </p>
          </section>

          <section>
            <h2>Limitation of Liability</h2>
            <p>
              Bogle shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages resulting from your use of our services.
            </p>
          </section>

          <section>
            <h2>Termination</h2>
            <p>
              Either party may terminate this agreement at any time with written notice. 
              Upon termination, you remain responsible for any outstanding fees.
            </p>
          </section>

          <section>
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users 
              of significant changes via email or through our website.
            </p>
          </section>

          <section>
            <h2>Contact Information</h2>
            <p>
              For questions about these Terms of Service, contact us at{' '}
              <a href="mailto:legal@bogle.com">legal@bogle.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;