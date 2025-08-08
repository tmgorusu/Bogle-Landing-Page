import React from "react";
import "./Homepage.css";
import Logo from "./assets/Logo.png";

const Security = () => {
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
          <h1>Security & Data Protection</h1>
          <p className="last-updated">Last updated: January 2024</p>

          <section>
            <h2>Our Security Commitment</h2>
            <p>
              At Bogle, we take the security of your data and payments seriously. We implement 
              industry-leading security measures to protect your information and transactions.
            </p>
          </section>

          <section>
            <h2>Data Encryption</h2>
            <p>
              All data transmitted to and from our servers is encrypted using TLS 1.3 encryption. 
              Sensitive payment information is encrypted at rest using AES-256 encryption.
            </p>
          </section>

          <section>
            <h2>PCI Compliance</h2>
            <p>
              We are PCI DSS Level 1 compliant, the highest level of certification available in 
              the payments industry. This ensures that we meet the strictest security standards 
              for handling credit card information.
            </p>
          </section>

          <section>
            <h2>Fraud Prevention</h2>
            <p>Our fraud prevention measures include:</p>
            <ul>
              <li>Real-time transaction monitoring</li>
              <li>Machine learning-based fraud detection</li>
              <li>Multi-factor authentication</li>
              <li>Risk scoring algorithms</li>
              <li>Velocity checking and pattern analysis</li>
            </ul>
          </section>

          <section>
            <h2>Infrastructure Security</h2>
            <p>
              Our infrastructure is hosted on secure, SOC 2 Type II certified cloud platforms. 
              We maintain regular security audits, penetration testing, and vulnerability assessments.
            </p>
          </section>

          <section>
            <h2>Data Retention</h2>
            <p>
              We retain your data only as long as necessary to provide our services and comply 
              with legal requirements. Payment data is securely deleted according to industry standards.
            </p>
          </section>

          <section>
            <h2>Incident Response</h2>
            <p>
              We have a comprehensive incident response plan in place. In the unlikely event of 
              a security incident, we will notify affected users promptly and take immediate 
              action to secure your data.
            </p>
          </section>

          <section>
            <h2>Security Questions</h2>
            <p>
              If you have questions about our security practices, please contact our security team at{' '}
              <a href="mailto:security@bogle.com">security@bogle.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Security;