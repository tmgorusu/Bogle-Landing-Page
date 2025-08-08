# Requirements Document

## Introduction

This feature involves implementing comprehensive improvements to the Bogle landing page website based on user feedback and usability testing. The improvements focus on content clarity, visual consistency, layout optimization, and enhanced user experience while maintaining the core value proposition of providing multiple payment options that reduce fees for both businesses and customers.

## Requirements

### Requirement 1

**User Story:** As a business owner visiting the website, I want to clearly understand that Bogle adds payment options without removing existing ones, so that I feel confident about adopting the service without disrupting my current setup.

#### Acceptance Criteria

1. WHEN a user views the hero section THEN the system SHALL emphasize "We allow businesses to add more payment options without taking any away"
2. WHEN a user reads the value proposition THEN the system SHALL highlight "Keep your current methods and give customers more ways to pay—with cost savings on both ends"
3. WHEN a user navigates through the content THEN the system SHALL consistently reinforce the additive nature of the service

### Requirement 2

**User Story:** As a business owner, I want to understand that smart discounts are completely optional and under my control, so that I can make informed decisions about implementing them.

#### Acceptance Criteria

1. WHEN a user views the Smart Discounts section THEN the system SHALL clarify that discounts are optional and fully controlled by the business
2. WHEN a user reads about discounts THEN the system SHALL display messaging "Your business chooses whether and how much to offer—completely optional and customizable"
3. WHEN a user examines discount examples THEN the system SHALL clearly indicate these are optional business decisions

### Requirement 3

**User Story:** As a potential customer, I want to understand how offering more payment methods benefits my customers, so that I can see the complete value proposition.

#### Acceptance Criteria

1. WHEN a user views customer benefit sections THEN the system SHALL emphasize that offering more payment methods improves customer convenience
2. WHEN a user reads about customer experience THEN the system SHALL replace "delight" with "create a better checkout experience" or "simplify payments for your customers"
3. WHEN a user evaluates the service THEN the system SHALL present grounded, practical benefits rather than emotional language

### Requirement 4

**User Story:** As a business owner, I want transparent information about how discounts are calculated and what savings mean, so that I can make informed financial decisions.

#### Acceptance Criteria

1. WHEN a user views the Smart Discount Breakdown THEN the system SHALL be transparent about how discounts are calculated
2. WHEN a user examines cost comparisons THEN the system SHALL rephrase from "what you pay" and "processing fee" to "savings for your business" and "savings for your customers"
3. WHEN a user reviews savings information THEN the system SHALL show total combined savings impact for both customers and business
4. WHEN a user navigates to this section THEN the system SHALL display the renamed section "How Smart Discounts Work (and Save Everyone Money)"

### Requirement 5

**User Story:** As a user unfamiliar with technical payment terms, I want to understand payment methods in plain language, so that I can easily choose the best option for my business.

#### Acceptance Criteria

1. WHEN a user views payment method options THEN the system SHALL replace "ACH" with "Pay by Bank" or "Bank Pay by Bogle" everywhere
2. WHEN a user sees payment method icons THEN the system SHALL use a bank emoji or icon instead of the letters "ACH"
3. WHEN a user reads payment descriptions THEN the system SHALL use consumer-friendly terminology throughout

### Requirement 6

**User Story:** As a user viewing the payment options, I want consistent and properly aligned visual elements, so that the interface appears professional and trustworthy.

#### Acceptance Criteria

1. WHEN a user views the credit card payment option THEN the system SHALL center the "Best Value" font label inside the credit card box
2. WHEN a user examines all payment icons THEN the system SHALL ensure consistent size and position across all options
3. WHEN a user views payment method spacing THEN the system SHALL match icon spacing consistently - if ACH is centered in one place, it SHALL be centered everywhere

### Requirement 7

**User Story:** As a business owner concerned about payment security, I want to understand how ACH and crypto reduce risks, so that I can evaluate these options confidently.

#### Acceptance Criteria

1. WHEN a user views ACH/crypto information THEN the system SHALL explain that crypto is irreversible and eliminates chargeback fraud
2. WHEN a user reads about Bank Pay THEN the system SHALL explain that it allows balance check, authorization, and requires credit card holds on large purchases to reduce risk
3. WHEN a user examines risk information THEN the system SHALL clarify that these methods reduce chargeback risk rather than prevent it entirely

### Requirement 8

**User Story:** As a potential customer reading about the service, I want clear and understandable descriptions of what Bogle offers, so that I can quickly grasp the value proposition.

#### Acceptance Criteria

1. WHEN a user reads the service description THEN the system SHALL replace the confusing quote with "Bogle gives small businesses the tools to offer payment choices that reduce fees—for themselves and their customers"
2. WHEN a user views explanatory text THEN the system SHALL use clear, jargon-free language throughout
3. WHEN a user navigates the site THEN the system SHALL maintain consistent messaging about the core value proposition

### Requirement 9

**User Story:** As a user viewing the Complete Payment Solutions section, I want a visually balanced and organized layout, so that I can easily scan and understand the available services.

#### Acceptance Criteria

1. WHEN a user views the Complete Payment Solutions layout THEN the system SHALL use a consistent 2x3 (6 total), 2x2, or 1x4 layout
2. WHEN a user examines the service tiles THEN the system SHALL avoid uneven or offset tiles that appear unbalanced visually
3. WHEN a user navigates this section THEN the system SHALL maintain visual hierarchy and readability

### Requirement 10

**User Story:** As a user interacting with the website, I want proper spacing and functional elements, so that I have a smooth browsing experience.

#### Acceptance Criteria

1. WHEN a user views the email input section THEN the system SHALL add more space between "processing" and the email input field
2. WHEN a user examines font hierarchies THEN the system SHALL review spacing between large/small fonts to maintain readability
3. WHEN a user interacts with buttons THEN the system SHALL ensure all interactive elements are functional
4. WHEN a user views images THEN the system SHALL fix any broken images and ensure all URLs use https://
5. WHEN a user sees trial information THEN the system SHALL remove "30-day free trial" under early access as it's not accurate

### Requirement 11

**User Story:** As a first-time visitor, I want to see what the actual payment portal looks like and understand the savings clearly, so that I can visualize using the service.

#### Acceptance Criteria

1. WHEN a user views the top section THEN the system SHALL add an image of the actual payment portal instead of just the fee calculator
2. WHEN a user examines savings numbers THEN the system SHALL improve transparency by making it clear if displayed savings are for the business, customer, or combined
3. WHEN a user considers a demo THEN the system SHALL add a demo video or remove the button if not ready

### Requirement 12

**User Story:** As a user on any device, I want the website to work properly on mobile screens, so that I can access information regardless of my device.

#### Acceptance Criteria

1. WHEN a user accesses the site on mobile THEN the system SHALL ensure all layout and components are fully optimized for smaller screens
2. WHEN a user interacts with CTAs on mobile THEN the system SHALL test responsiveness for key call-to-action areas
3. WHEN a user uses payment selection tools on mobile THEN the system SHALL ensure proper functionality and display

### Requirement 13

**User Story:** As a user interested in joining the waitlist, I want the form to work correctly, so that I can successfully sign up for updates.

#### Acceptance Criteria

1. WHEN a user submits the waitlist form THEN the system SHALL confirm form logic works as expected
2. WHEN a user attempts to join the waitlist THEN the system SHALL provide clear feedback on submission status
3. IF the waitlist functionality is not ready THEN the system SHALL temporarily disable the form until it's functional