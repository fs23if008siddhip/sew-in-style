import React from "react";
import './AboutDisplay.css';
import hero from '../Assets/hero.jpeg';
import logo from '../Assets/logo.png';
import team1 from '../Assets/team1.jpeg';
import team2 from '../Assets/team2.jpeg';
import team3 from '../Assets/team3.jpeg';
import team4 from '../Assets/team4.jpeg';

const AboutDisplay = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero">
        <img src={hero} alt="Fashion Hero" className="hero-img" />
        <div className="hero-overlay">
          <h1>About Us</h1>
          <p>
            A world of vibrant colors, timeless style, and creative expression —
            where every outfit tells a story.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section row">
        <div className="text">
          <h2>Who We Are</h2>
          <p>
            We are a fashion brand devoted to self-expression. Our collections
            are inspired by pastel vibrancy, playful tones, and bold silhouettes
            that let you shine your brightest.
          </p>
          <p>
            Blending tradition with modern creativity, we design clothes that
            not only look stunning but also empower confidence in everyone who
            wears them.
          </p>
        </div>
        <div className="image">
          <img src={logo} alt="Brand Logo" className="logo" />
        </div>
      </section>

      {/* Designer */}
      <section className="section row reverse">
        <div className="text">
          <h2>Our Designer – Vishaka</h2>
          <p>
            Vishaka is the visionary behind our brand. With her passion for
            pastel artistry and cultural storytelling, she creates designs that
            merge bold individuality with everyday comfort.
          </p>
          <p>
            Her journey began with a dream to bring colors of joy into fashion —
            today, her creativity inspires every stitch, every pattern, and
            every collection we proudly present.
          </p>
        </div>
        <div className="image">
          <img src={team4} alt="Vishaka" />
        </div>
      </section>

      {/* Models Showcase */}
      <section className="models">
        <h2>Our Style Showcase</h2>
        <p className="subtitle">
          Discover how our designs come alive through vibrant personalities.
        </p>
        <div className="model-grid">
          <div className="model-card"><img src={team1} alt="Model 1" /></div>
          <div className="model-card"><img src={team2} alt="Model 2" /></div>
          <div className="model-card"><img src={team3} alt="Model 3" /></div>
        </div>
      </section>
    </div>
  );
};

export default AboutDisplay;
