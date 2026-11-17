
import { useState } from "react";
import {
  ArrowRight, Check, ChevronRight, Sparkles,
  LayoutDashboard, Palette, Move3D, ShieldCheck,
  Menu, X, Sofa, WandSparkles
} from "lucide-react";
import "./LandingPage.css";

const features = [
  {
    icon: Move3D,
    title: "Interactive 3D design",
    description: "Explore your room from every angle. Move, rotate and resize furniture in a live 3D space."
  },
  {
    icon: Palette,
    title: "Your style, your colours",
    description: "Experiment with wall colours, flooring and furniture shades until everything feels right."
  },
  {
    icon: LayoutDashboard,
    title: "Every room in one place",
    description: "Design your living room, bedroom, kitchen, bathroom, office and nursery in one workspace."
  }
];

const steps = [
  ["01", "Choose your room", "Start with one of six room spaces and make it your own."],
  ["02", "Add your furniture", "Explore the furniture collection and arrange each piece."],
  ["03", "Make it yours", "Adjust colours, positions and sizes, then save your design."]
];

function LandingPage({ onStart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return;
    }
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="landing">
      <header className="landing-nav">
        <a href="#home" className="landing-brand" onClick={closeMenu}>
          <span className="landing-brand-mark">R</span>
          roomora<span className="brand-period">.</span>
        </a>

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? "landing-links open" : "landing-links"}>
          <a href="#features" onClick={closeMenu}>Features</a>
          <a href="#how-it-works" onClick={closeMenu}>How it works</a>
          <a href="#pricing" onClick={closeMenu}>Pricing</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <button className="nav-cta" onClick={onStart}>
            Start designing <ArrowRight size={15} />
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="hero-tag">
              <Sparkles size={14} />
              YOUR SPACE. YOUR STORY.
            </div>

            <h1>
              Imagine it.
              <br />
              <em>Design it.</em>
              <br />
              Live it.
            </h1>

            <p className="hero-description">
              A more personal way to design your home.
              Explore rooms in 3D, arrange furniture and
              bring your ideas to life — all in one place.
            </p>

            <div className="hero-actions">
              <button className="primary-cta" onClick={onStart}>
                Start designing for free <ArrowRight size={17} />
              </button>
              <a href="#how-it-works" className="text-cta">
                Discover how it works <ChevronRight size={16} />
              </a>
            </div>

            <div className="hero-note">
              <span><Check size={14} /> No installation required</span>
              <span><Check size={14} /> Easy to get started</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-main">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85"
                alt="Warm modern living room interior"
              />
            </div>
            <div className="hero-image-small">
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=85"
                alt="Elegant interior furniture and decor"
              />
            </div>
            <div className="floating-note">
              <span className="floating-icon"><WandSparkles size={18} /></span>
              <span><strong>Your dream space</strong><small>Starts with an idea</small></span>
            </div>
            <div className="hero-image-caption">DESIGNED AROUND YOU</div>
          </div>
        </section>

        <section className="trust-strip">
          <span>DESIGN WITH FREEDOM</span>
          <span className="trust-divider" />
          <span>EXPLORE IN 3D</span>
          <span className="trust-divider" />
          <span>MAKE IT PERSONAL</span>
          <span className="trust-divider" />
          <span>CREATE YOUR SPACE</span>
        </section>

        <section className="features-section section-pad" id="features">
          <div className="section-heading">
            <p className="section-eyebrow">A BETTER WAY TO DESIGN</p>
            <h2>Everything you need to<br /><em>feel at home.</em></h2>
            <p>Thoughtful tools that make imagining your space simple and enjoyable.</p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article className="feature-card" key={feature.title}>
                  <div className="feature-icon"><Icon size={22} /></div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <span className="feature-number">ROOMORA / 0{features.indexOf(feature) + 1}</span>
                </article>
              );
            })}
          </div>
        </section>

        <section className="showcase-section">
          <div className="showcase-image">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85"
              alt="Beautiful contemporary home interior"
            />
          </div>
          <div className="showcase-content">
            <p className="section-eyebrow">YOUR VISION, YOUR WAY</p>
            <h2>Good design starts<br />with <em>your imagination.</em></h2>
            <p>
              Whether you're refreshing a single corner or planning
              an entire home, Roomora gives you a space to experiment,
              explore and create with confidence.
            </p>
            <button className="primary-cta" onClick={onStart}>
              Explore the studio <ArrowRight size={17} />
            </button>
          </div>
        </section>

        <section className="how-section section-pad" id="how-it-works">
          <div className="section-heading">
            <p className="section-eyebrow">SIMPLE BY DESIGN</p>
            <h2>Three steps to your<br /><em>dream space.</em></h2>
            <p>From a blank room to a space that feels like yours.</p>
          </div>

          <div className="steps-grid">
            {steps.map(([number, title, description]) => (
              <article className="step-card" key={number}>
                <span className="step-number">{number}</span>
                <div className="step-line" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <button className="primary-cta centered-cta" onClick={onStart}>
            Create your first room <ArrowRight size={17} />
          </button>
        </section>

        <section className="pricing-section section-pad" id="pricing">
          <div className="section-heading">
            <p className="section-eyebrow">SIMPLE AND TRANSPARENT</p>
            <h2>A little room for<br /><em>big ideas.</em></h2>
            <p>Start exploring. No payment details needed.</p>
          </div>

          <div className="pricing-grid">
            <article className="price-card">
              <span className="plan-label">STARTER</span>
              <h3>Free</h3>
              <p className="plan-description">A place to start imagining.</p>
              <div className="plan-price">₹0 <small>/ forever</small></div>
              <ul>
                <li><Check size={16} /> Access to all six room types</li>
                <li><Check size={16} /> Interactive 3D room preview</li>
                <li><Check size={16} /> Furniture customisation</li>
                <li><Check size={16} /> Save designs in your browser</li>
              </ul>
              <button className="plan-button secondary-plan" onClick={onStart}>
                Get started <ArrowRight size={16} />
              </button>
            </article>

            <article className="price-card featured-price">
              <span className="plan-badge">A FUTURE POSSIBILITY</span>
              <span className="plan-label">PRO</span>
              <h3>Coming soon</h3>
              <p className="plan-description">More possibilities for bigger plans.</p>
              <div className="plan-price">Soon <small>/ stay tuned</small></div>
              <ul>
                <li><Check size={16} /> Advanced design tools</li>
                <li><Check size={16} /> More furniture collections</li>
                <li><Check size={16} /> Expanded design options</li>
                <li><Check size={16} /> Future project features</li>
              </ul>
              <button className="plan-button primary-plan" onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}>
                Get updates <ArrowRight size={16} />
              </button>
            </article>
          </div>
          <p className="pricing-disclaimer">
            Roomora is currently free to explore. Pro is a planned offering, not a currently available subscription.
          </p>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="contact-copy">
            <p className="section-eyebrow">LET'S TALK DESIGN</p>
            <h2>Have an idea?<br /><em>Let's hear it.</em></h2>
            <p>
              Have feedback, questions or ideas for Roomora?
              Send us a message. We'd love to hear from you.
            </p>
            <div className="contact-decoration"><Sofa size={42} strokeWidth={1} /></div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send us a message</h3>
            <label>
              Your name
              <input
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </label>
            <label>
              Email address
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </label>
            <label>
              Your message
              <textarea
                placeholder="Tell us what you have in mind..."
                rows="4"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </label>
            <button className="primary-cta form-submit" type="submit">
              Send message <ArrowRight size={16} />
            </button>
            {submitted && (
              <p className="form-success">
                Thank you! Your message has been received in this demo.
              </p>
            )}
          </form>
        </section>
      </main>

      <footer className="landing-footer">
        <a href="#home" className="landing-brand">
          <span className="landing-brand-mark">R</span>
          roomora<span className="brand-period">.</span>
        </a>
        <p>Make space for what matters.</p>
        <span>© {new Date().getFullYear()} Roomora. Designed with care.</span>
      </footer>
    </div>
  );
}

export default LandingPage;
