# Implementation Plan

- [x] 1. Update hero section content and messaging
  - Modify hero subtitle to emphasize additive nature: "We allow businesses to add more payment options without taking any away"
  - Update value proposition to "Keep your current methods and give customers more ways to pay—with cost savings on both ends"
  - Replace confusing service description quote with clear messaging
  - _Requirements: 1.1, 1.2, 8.1, 8.2_

- [x] 2. Implement Smart Discounts section improvements
  - [x] 2.1 Rename section to "How Smart Discounts Work (and Save Everyone Money)"
    - Update section title in Homepage.jsx
    - Add prominent disclaimer about optional nature of discounts
    - _Requirements: 4.4, 2.1, 2.2_

  - [x] 2.2 Restructure discount comparison cards for transparency
    - Replace "what you pay" and "processing fee" with "savings for your business" and "savings for your customers"
    - Add total combined savings display showing impact for both customers and business
    - Update breakdown labels to be more transparent about calculations
    - _Requirements: 4.1, 4.2, 4.3_

- [ ] 3. Replace ACH terminology with user-friendly language
  - [ ] 3.1 Global find and replace ACH references
    - Replace all instances of "ACH" with "Pay by Bank" or "Bank Pay by Bogle" in Homepage.jsx
    - Update payment method titles and descriptions
    - Ensure consistent terminology across all sections
    - _Requirements: 5.1, 5.3_

  - [x] 3.2 Add risk explanation content for payment methods
    - Add explanation that crypto is irreversible and eliminates chargeback fraud
    - Explain Bank Pay verification, authorization, and credit card backup system for large purchases
    - Clarify that these methods reduce rather than prevent chargeback risk
    - _Requirements: 7.1, 7.2, 7.3_

- [ ] 4. Replace emoji icons with professional SVG icons
  - [ ] 4.1 Create professional icon assets
    - Design or source SVG icons for payment methods (credit card, bank, crypto)
    - Create icons for service features (invoice, shopping, web, calendar, mobile, recurring)
    - Design icons for benefits and features (savings, security, experience, speed, integration)
    - _Requirements: 5.2, Professional Icon System_

  - [ ] 4.2 Update payment method icons
    - Replace emoji icons in payment method cards with professional SVG icons
    - Update CSS to properly size and position new icons
    - Ensure consistent icon styling across all payment methods
    - _Requirements: 5.2, 6.2, 6.3_

  - [ ] 4.3 Replace emojis throughout services and benefits sections
    - Update service cards to use professional icons instead of emojis
    - Replace benefit icons with professional alternatives
    - Update differentiator section icons
    - _Requirements: Professional Icon System_

- [ ] 5. Fix payment method card visual consistency
  - [ ] 5.1 Center "Best Value" badge in credit card payment option
    - Update CSS positioning for featured-badge class
    - Ensure badge is properly centered within the card
    - _Requirements: 6.1_

  - [ ] 5.2 Standardize icon sizes and positioning
    - Ensure all payment method icons are consistent in size (80px x 80px)
    - Center all icons consistently - if one is centered, all should be centered
    - Update method-icon CSS class for consistent alignment
    - _Requirements: 6.2, 6.3_

- [ ] 6. Implement consistent services grid layout
  - Restructure Complete Payment Solutions section to use 2x3 (6 total) grid layout
  - Remove uneven or offset tiles that appear visually unbalanced
  - Update services-grid CSS to ensure proper grid structure
  - Add responsive behavior for mobile devices (single column)
  - _Requirements: 9.1, 9.2, 9.3_

- [ ] 7. Fix spacing and interactive elements
  - [ ] 7.1 Improve form spacing and functionality
    - Add proper spacing between "processing" text and email input field
    - Review and fix spacing between large/small fonts for better hierarchy
    - Ensure waitlist form logic works correctly or disable if not ready
    - _Requirements: 10.1, 10.2, 13.1, 13.2_

  - [ ] 7.2 Fix broken elements and remove inaccurate content
    - Ensure all interactive buttons are functional
    - Fix any broken images and convert http:// URLs to https://
    - Remove "30-day free trial" text under early access section
    - _Requirements: 10.3, 10.4, 10.5_

- [ ] 8. Update customer experience messaging
  - Replace "delight customers" with "create a better checkout experience" or "simplify payments for your customers"
  - Add messaging about how offering more payment methods improves customer convenience
  - Use grounded, practical language instead of emotional terms
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 9. Enhance first load section with payment portal visual
  - [ ] 9.1 Add actual payment portal image
    - Replace fee calculator with image of actual payment portal that customers will use
    - Ensure image is optimized and uses https://
    - _Requirements: 11.1_

  - [ ] 9.2 Improve savings transparency
    - Make it clear whether displayed savings are for business, customer, or combined
    - Update savings showcase to show breakdown of who benefits
    - _Requirements: 11.2_

  - [ ] 9.3 Handle demo functionality
    - Add demo video if available or remove demo button if not ready
    - Ensure any demo functionality works properly
    - _Requirements: 11.3_

- [ ] 10. Optimize mobile responsiveness
  - [ ] 10.1 Test and fix mobile layout issues
    - Ensure all layout changes work properly on smaller screens
    - Test payment selection tools on mobile devices
    - Verify grid layouts collapse appropriately on mobile
    - _Requirements: 12.1, 12.3_

  - [ ] 10.2 Optimize mobile call-to-action areas
    - Test responsiveness of key CTA buttons and forms
    - Ensure proper touch targets and spacing on mobile
    - Verify waitlist form works correctly on mobile devices
    - _Requirements: 12.2, 13.3_

- [ ] 11. Implement comprehensive testing and validation
  - [ ] 11.1 Content validation testing
    - Run automated search to ensure all "ACH" references are replaced
    - Verify all images use https:// URLs
    - Test all interactive elements for proper functionality
    - _Requirements: All terminology and functionality requirements_

  - [ ] 11.2 Cross-browser and device testing
    - Test layout consistency across different browsers
    - Verify mobile responsiveness on various devices
    - Ensure icon loading and display works across platforms
    - _Requirements: 12.1, 12.2, 12.3_

- [ ] 12. Final polish and optimization
  - Review overall visual consistency and professional appearance
  - Optimize any new images or assets for performance
  - Ensure all changes maintain or improve site performance
  - Conduct final user experience review of all implemented changes
  - _Requirements: All visual consistency and performance requirements_