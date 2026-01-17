 "use client";

import { useState } from "react";
import { Phone, Send, Instagram, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import Image from "next/image";

const navLinks = [
  { label: "Главная", href: "#" },
  { label: "Поиск туров", href: "#search" },
  { label: "Горящие туры", href: "#destinations" },
  { label: "О нас", href: "#advantages" },
  { label: "Контакты", href: "#footer" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <Image src={logo} alt="OkeyTour" className="h-10 md:h-12 w-auto" priority />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground/70 hover:text-foreground font-medium text-sm transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Side - Contact & Social */}
          <div className="hidden md:flex items-center gap-4">
            {/* Phone */}
            <a
              href="tel:+998901234567"
              className="flex items-center gap-2 text-foreground font-semibold hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-sm">+998 90 123-45-67</span>
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-2 ml-2">
              <a
                href="https://t.me/okeytour"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-secondary/10 hover:bg-secondary/20 flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4 text-secondary" />
              </a>
              <a
                href="https://instagram.com/okeytour"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4 text-primary" />
              </a>
            </div>

            {/* Language Selector */}
            <div className="relative ml-2">
              <button className="flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted">
                RU
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border/50 py-4 animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-foreground/70 hover:text-foreground font-medium py-2 px-4 rounded-md hover:bg-muted transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-border/50 px-4">
              <a
                href="tel:+998901234567"
                className="flex items-center gap-2 text-foreground font-semibold"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>+998 90 123-45-67</span>
              </a>
              <div className="flex items-center gap-3 mt-3">
                <a
                  href="https://t.me/okeytour"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center"
                >
                  <Send className="w-5 h-5 text-secondary" />
                </a>
                <a
                  href="https://instagram.com/okeytour"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <Instagram className="w-5 h-5 text-primary" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
