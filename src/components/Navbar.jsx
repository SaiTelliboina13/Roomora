
import { Search, Heart, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar">
      <a href="#home" className="logo">
        roomora<span>.</span>
      </a>

      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#explore">Explore</a>
        <a href="#inspiration">Inspiration</a>
        <a href="#about">About us</a>
      </nav>

      <div className="nav-actions">
        <button aria-label="Search"><Search /></button>
        <button aria-label="Favorites"><Heart /></button>
        <a href="#explore" className="nav-cta">Get Started <span>↗</span></a>
      </div>

      <button className="mobile-menu" aria-label="Menu">
        <Menu />
      </button>
    </header>
  );
}
