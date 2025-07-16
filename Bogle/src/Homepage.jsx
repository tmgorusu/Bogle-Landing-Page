import React, { useEffect, useRef } from "react";
import "./Homepage.css";
import BImg from "./assets/B.png";
import OImg from "./assets/O.png";
import GImg from "./assets/G.png";
import LImg from "./assets/L.png";
import EImg from "./assets/E.png";
import Logo from './assets/Logo.png'
import Shopify from './assets/shopify.png'
import Calendar from './assets/calendar.png'
import Landing from './assets/landing.png'

const cardData = [
  { title: "Get paid your way", subtitle: "Bogle supports ACH, credit cards, and crypto—so you never miss a sale." },
  { title: "Designed to help you save", subtitle: "ACH support enables lower processing fees—just 0.5% per transaction." },
  { title: "Fewer disputes, more peace of mind", subtitle: "ACH transactions are bank-authorized, helping reduce chargeback risk." },
  { title: "Plug into your payment stack", subtitle: "Bogle integrates with tools like Stripe, Shopify, and QuickBooks to fit right into your workflow." },
];

const Homepage = () => {
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    sectionRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => {
      sectionRefs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={Logo} alt="Logo" />
        </div>
        <button className="navbar-waitlist-btn">Join Waitlist</button>
      </nav>
      {/* End Navbar */}
      <section ref={sectionRefs[0]} className="homepage-section section1 ">
        <div className="homepage-section-content" style={{display:'flex', flexDirection:'row'}}>
            <div className="homepage-section-content-left" style={{width:'40vw'}}>
                {/* Replace <h1>Bogle</h1> with images for B, O, G, L, E */}
                <div className="bogle-header-images" style={{margin:0}}>
                  <img src={BImg} alt="B" className="bogle-letter B" />
                  <img src={OImg} alt="O" className="bogle-letter O" />
                  <img src={GImg} alt="G" className="bogle-letter G" />
                  <img src={LImg} alt="L" className="bogle-letter L" />
                  <img src={EImg} alt="E" className="bogle-letter E" />
                </div>
                <p className="fade-in" style={{fontSize:'55px', margin:0, lineHeight:'60px', paddingBottom:'15px'}}> One Platform. <br /> Every Payment.</p>
                <div className="fade-in" style={{width:'26vw', fontSize:'24px'}}>
                <p style={{margin:0}}><i>Lower your costs, protect your revenue, and give your customers every way to pay. </i></p>
                </div>
                <button className="fade-in" style={{backgroundColor:'white', color:'black', fontSize:'20px', padding:'10px', marginTop:'20px', borderRadius:'0px'}}>Join Waitlist</button>
            </div>
            <div className="homepage-section-content-right" style={{width:'30vw'}}>
                <img src={Landing} style={{height:'400px'}}/>
            </div>
        </div>
      </section>
      <section ref={sectionRefs[1]} className="homepage-section section2 " style={{overflowY:"hidden"}}>
        <div className="stacked-cards-container">
          {cardData.map((item, idx) => (
            idx < 3 ? <div className="stacked-card" key={idx}>
              <div className="stacked-card-title">{item.title}</div>
              <div className="stacked-card-subtitle">{item.subtitle}</div>
            </div> : 
            <div className="stacked-card" style={{borderBottom:'0'}} key={idx}>
              <div className="stacked-card-title">{item.title}</div>
              <div className="stacked-card-subtitle">{item.subtitle}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="homepage-section section3 ">
        <div ref={sectionRefs[2]} className="section3-content drop-fade-in">
          <div className="section3-left">
            <div className="section3-title">Easily Connect Bogle with Your Tools</div>
            <div className="section3-bar"></div>
            <div className="section3-subtitle">Add Bogle to platforms like Shopify, QuickBooks, and Stripe in just minutes. No dev team needed.</div>
          </div>
          <div className="section3-right">
            <img src={Shopify} alt="Shopify" className="section3-image" />
          </div>
        </div>
      </section>
      <section className="homepage-section section4 ">
        <div  ref={sectionRefs[3]} className="section4-content drop-fade-in">
          <div className="section4-left">
            <img src={Calendar} alt="Shopify" className="section4-image" />
          </div>
          <div className="section4-right">
            <div className="section4-title">Payments + Productivity, All in One</div>
            <div className="section4-bar"></div>
            <div className="section4-subtitle">Manage invoices, track payments, and sync your calendar—right from your dashboard. Built-in tools designed to keep your business running smoothly.</div>
          </div>
        </div>
      </section>
      <section ref={sectionRefs[4]} className="homepage-section section5 drop-fade-in">
        <div className="section5-center-content">
          <div className="section5-big-title">Stop wasting money on credit card fees <br/> Checkout with Bogle </div>
          <button className="section5-cta-btn">Join Waitlist</button>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
