
import { ArrowUpRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="eyebrow">
          <span className="eyebrow-dot"></span>
          THE ART OF BETTER LIVING
        </div>

        <h1>
          Your space.
          <br />
          Your <span>story.</span>
          <br />
          Your masterpiece.
        </h1>

        <p className="hero-description">
          Discover beautiful interiors, explore fresh ideas,
          and create spaces that feel unmistakably yours.
          Your dream home starts here.
        </p>

        <div className="hero-buttons">
          <a href="#explore" className="primary-btn">
            Explore designs <ArrowUpRight size={18} />
          </a>

          <a href="#inspiration" className="secondary-btn">
            <span className="play-icon"><Play size={13} fill="currentColor" /></span>
            Discover Roomora
          </a>
        </div>

        <div className="hero-stats">
          <div>
            <strong>10K<span>+</span></strong>
            <small>Design inspirations</small>
          </div>
          <div className="stat-divider"></div>
          <div>
            <strong>50<span>+</span></strong>
            <small>Interior styles</small>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400"
          alt="Beautiful contemporary living room"
        />

        <div className="image-label">
          <span>01 / 05</span>
          <strong>Modern living</strong>
          <small>Warm minimalism · 2026</small>
        </div>

        <div className="floating-note">
          <span className="note-icon">✳</span>
          <div>
            <strong>Find your aesthetic</strong>
            <small>Ideas made for your space</small>
          </div>
        </div>
      </div>
    </section>
  );
}
