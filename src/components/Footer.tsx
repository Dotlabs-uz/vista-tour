import { MapPin, Phone, Mail, Send, Instagram, Clock } from "lucide-react";
import logo from "@/assets/logo.png";
import Image from "next/image";

const quickLinks = [
  { label: "Главная", href: "#" },
  { label: "Поиск туров", href: "#search" },
  { label: "Горящие туры", href: "#destinations" },
  { label: "О нас", href: "#advantages" },
  { label: "Контакты", href: "#footer" },
];

const destinations = [
  "Турция",
  "ОАЭ",
  "Египет",
  "Мальдивы",
  "Таиланд",
  "Грузия",
];

const Footer = () => {
  return (
    <footer id="footer" className="bg-footer text-footer-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Image src={logo} alt="OkeyTour" className="h-10 w-auto mb-6 brightness-110" />
            <p className="text-footer-foreground/70 text-sm leading-relaxed mb-6">
              Ваш надежный партнер в мире путешествий. Мы делаем отдых доступным и незабываемым с 2014 года.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/okeytour"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-footer-foreground/10 hover:bg-secondary/30 flex items-center justify-center transition-colors"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/okeytour"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-footer-foreground/10 hover:bg-primary/30 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary-foreground font-semibold text-lg mb-5">
              Быстрые ссылки
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-footer-foreground/70 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-primary-foreground font-semibold text-lg mb-5">
              Направления
            </h4>
            <ul className="space-y-3">
              {destinations.map((destination) => (
                <li key={destination}>
                  <a
                    href="#destinations"
                    className="text-footer-foreground/70 hover:text-primary text-sm transition-colors"
                  >
                    {destination}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-primary-foreground font-semibold text-lg mb-5">
              Контакты
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-footer-foreground/70 text-sm">
                  г. Самарканд, ул. Регистан, 15
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+998901234567"
                  className="text-footer-foreground/70 hover:text-primary text-sm transition-colors"
                >
                  +998 90 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@okeytour.uz"
                  className="text-footer-foreground/70 hover:text-primary text-sm transition-colors"
                >
                  info@okeytour.uz
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-footer-foreground/70 text-sm">
                  Пн-Сб: 09:00 - 18:00
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-footer-foreground/10">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-footer-foreground/50 text-sm">
              © 2026 okeytour.uz. Все права защищены.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a
                href="#"
                className="text-footer-foreground/50 hover:text-footer-foreground transition-colors"
              >
                Политика конфиденциальности
              </a>
              <a
                href="#"
                className="text-footer-foreground/50 hover:text-footer-foreground transition-colors"
              >
                Публичная оферта
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
