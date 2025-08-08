import React from "react";
import "./Homepage.css";
import Logo from "./assets/Logo.png";

const PrivacyPolicy = () => {
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
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: January 2024</p>

          <section>
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, 
              join our waitlist, or contact us for support. This may include your name, email address, 
              and payment information.
            </p>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about products, services, and events</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>
          </section>

          <section>
            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy. We may share your information 
              with trusted service providers who assist us in operating our website and conducting our business.
            </p>
          </section>

          <section>
            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience on our website. 
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2>Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information. 
              You may also opt out of certain communications from us.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@bogle.com">privacy@bogle.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;