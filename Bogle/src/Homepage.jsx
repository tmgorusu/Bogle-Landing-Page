import React, { useState, useRef, useEffect } from "react";
import "./Homepage.css";
import BImg from "./assets/B.png";
import OImg from "./assets/O.png";
import GImg from "./assets/G.png";
import LImg from "./assets/L.png";
import EImg from "./assets/E.png";
import Logo from './assets/Logo.png'
import Shopify from './assets/shopify.png'
import Calendar from './assets/calendar.png'
import Landing from './assets/landingfirst.png'

const carouselImages = [Landing, Landing, Landing];

const cardData = [
  { tab: "Get paid your way", title: "Flexible Payment Options", subtitle: "Bogle supports ACH, credit cards, and crypto—so you never miss a sale." },
  { tab: "Designed to help you save", title: "Lower Your Processing Fees", subtitle: "ACH support enables lower processing fees—just 0.5% per transaction." },
  { tab: "Fewer disputes, more peace of mind", title: "Reduce Chargeback Risk", subtitle: "ACH transactions are bank-authorized, helping reduce chargeback risk." },
  { tab: "Plug into your payment stack", title: "Integrate Seamlessly", subtitle: "Bogle integrates with tools like Stripe, Shopify, and QuickBooks to fit right into your workflow." },
];

const Homepage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [cardAnim, setCardAnim] = useState('drop-fade-in');
  const [displayedTab, setDisplayedTab] = useState(0);
  const cardRef = useRef(null);
  const tabCount = 3;
  const tabHeight = 60; // px, should match the button's height+padding

  // Carousel state
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [animClass, setAnimClass] = useState('carousel-drop-in');
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimClass('carousel-drop-out');
      setTimeout(() => {
        setCarouselIdx(idx => {
          const nextIdx = (idx + 1) % carouselImages.length;
          setAnimClass('carousel-drop-in');
          return nextIdx;
        });
      }, 350);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleTabClick = (idx) => {
    if (idx === displayedTab) return;
    setCardAnim('drop-fade-out');
    setTimeout(() => {
      setDisplayedTab(idx);
      setCardAnim('drop-fade-in');
    }, 400);
  };

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
      <section className="homepage-section section1">
        <div className="homepage-section-content-left">
          {/* Replace <h1>Bogle</h1> with images for B, O, G, L, E */}
          <div className="bogle-header-images" style={{margin:0}}>
            <img src={BImg} alt="B" className="bogle-letter B" />
            <img src={OImg} alt="O" className="bogle-letter O" />
            <img src={GImg} alt="G" className="bogle-letter G" />
            <img src={LImg} alt="L" className="bogle-letter L" />
            <img src={EImg} alt="E" className="bogle-letter E" />
          </div>
          <p className="fade-in" style={{fontSize:'55px', margin:0, lineHeight:'60px', paddingBottom:'15px'}}> Integrating ACH into <br/> your payment process </p>
          <div className="fade-in" style={{width:'26vw', fontSize:'24px'}}>
            <p style={{margin:0}}><i> Open a world of savings </i></p>
          </div>
          <button className="fade-in" style={{backgroundColor:'white', color:'black', fontSize:'20px', padding:'10px', marginTop:'20px', borderRadius:'5px'}}>Join Waitlist</button>
        </div>
        <div className="homepage-section-content-right" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', }}>
          <div style={{position:'relative', width:'auto', height:'min-content', marginTop:'100px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', paddingBottom: '40px', }}>
            <img 
              src={carouselImages[carouselIdx]} 
              className={animClass}
              style={{height:'600px', borderRadius:'18px', transition:'none', filter:'saturate(150%)'}}
              alt="carousel"
            />
            <div style={{display:'flex', gap:'8px', marginTop:'20px'}}>
              {carouselImages.map((_, i) => (
                <div
                  key={i}
                  onClick={() => {
                    if (i === carouselIdx) return;
                    setAnimClass('carousel-drop-out');
                    setTimeout(() => {
                      setCarouselIdx(i);
                      setAnimClass('carousel-drop-in');
                    }, 350);
                  }}
                  style={{
                    width:'14px',
                    height:'14px',
                    borderRadius:'50%',
                    background: i === carouselIdx ? '#51a454' : '#fff',
                    cursor: 'pointer',
                    border: i === carouselIdx ? '2px solid #51a454' : '2px solid #51a454',
                    transition: 'background 0.2s, border 0.2s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="homepage-section section2" style={{overflowY:"hidden"}}>
        <div className="section2-header">
          <div className="section2-title">The Bogle Benefit</div>
          <div className="section2-subtitle">Learn how integrating ACH into your payment process can benefit your business </div>
        </div>
        <div className="section2-tabs" style={{position:'absolute', height: tabCount * tabHeight}}>
          <div
            className="section2-tab-sliver"
            style={{
              transform: `translateY(${selectedTab * tabHeight}px)`,
              transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
              height: tabHeight - 8,
            }}
          />
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              className={`section2-tab${selectedTab === idx ? " active" : ""}`}
              onClick={() => { setSelectedTab(idx); handleTabClick(idx); }}
              style={{height: tabHeight - 8, marginBottom: 8, position: 'relative', zIndex: 1}}
            >
              {cardData[idx].tab}
            </button>
          ))}
        </div>
        <div className="section2-content">
          <div className="section2-left">
            <div className="section2-card-display">
              <div ref={cardRef} className={`section2-card ${cardAnim}`}>
                <div className="section2-card-title">{cardData[displayedTab].title}</div>
                {cardData[displayedTab].subtitle}
              </div>
            </div>
          </div>
          <div className="section2-right">
            {/* Empty for now */}
          </div>
        </div>
      </section>
      <section className="homepage-section section3">
        <div className="section3-content">
          <div className="section3-left">
            <div className="section3-title" style={{lineHeight:'60px'}}>Easily Connect Bogle with Your Tools</div>
            <div className="section3-subtitle">Add Bogle to platforms like Shopify, QuickBooks, and Stripe in just minutes. No dev team needed.</div>
          </div>
          <div className="section3-right">
            <img src={Shopify} alt="Shopify" className="section3-image" />
          </div>
        </div>
      </section>
      <section className="homepage-section section4">
        <div className="section4-content">
          <div className="section4-left">
            <img src={Calendar} alt="Shopify" className="section4-image" />
          </div>
          <div className="section4-right">
            <div className="section4-title"  style={{lineHeight:'60px'}}>Payments + Productivity, All in One</div>
            <div className="section4-subtitle">Manage invoices, track payments, and sync your calendar—right from your dashboard. Built-in tools designed to keep your business running smoothly.</div>
          </div>
        </div>
      </section>
      <section className="homepage-section section5">
        <div className="section5-glass">
          <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:'100%'}}>
            <div>
              <div className="section5-title"> We're Transparent</div>
              <div className="section5-subtitle"> No hidden fees, no surprises. ACH transactions are just 0.5%, and we’re fully transparent across all payment types—crypto and cards included.</div>
            </div>
            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', justifyContent:'center', minWidth:'260px', marginLeft:'2rem', gap:'1.2rem'}}>
              {/* Credit/Debit card fees (top, smaller) */}
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:'2.1rem', fontWeight:700, color:'#222', lineHeight:'1.1'}}>2.9% + 30c</div>
                <div style={{fontSize:'1.05rem', fontWeight:500, color:'#444', marginTop:'0.2rem'}}>per credit/debit card transaction</div>
              </div>
              {/* ACH fees (middle, largest) */}
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:'3.5rem', fontWeight:800, color:'#222', lineHeight:'1.1'}}>0.5% + 25c</div>
                <div style={{fontSize:'1.3rem', fontWeight:500, color:'#444', marginTop:'0.5rem'}}>per completed ACH transaction</div>
              </div>
              {/* Crypto fees (bottom, smaller) */}
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:'2.1rem', fontWeight:700, color:'#222', lineHeight:'1.1'}}>1.75%</div>
                <div style={{fontSize:'1.05rem', fontWeight:500, color:'#444', marginTop:'0.2rem'}}>per crypto transaction</div>
              </div>
            </div>
          </div>
        </div>
        <div className="section5-center-content">
          <div className="section5-big-title">Stop wasting money on credit card fees <br/> Checkout with Bogle </div>
          <button className="section5-cta-btn">Join Waitlist</button>
        </div>
      </section>
    </div>
  );
};
export default Homepage;
