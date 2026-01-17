import heroImage from "@/assets/hero-beach.jpg";
import Image from "next/image";
// local

const SearchWidget = () => {
  return (
    <div
      className="w-full max-w-5xl mx-auto glass-card rounded-2xl p-4 md:p-6 shadow-search animate-slide-up max-h-[70vh] overflow-auto"
      style={{ animationDelay: "0.3s" }}
    >
      <div
        // Tourvisor modifies classList on client (e.g. adds `tv-loaded`), which can cause hydration mismatch warnings.
        suppressHydrationWarning
        className="tv-search-form tv-moduleid-9975162"
      />
    </div>
  );
};

const HeroSection = () => {
  return (
    <section id="search" className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Tropical paradise beach resort"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-4 md:mb-6 animate-fade-in leading-tight">
            Ваше идеальное путешествие
            <br className="hidden sm:block" />
            <span className="text-primary">начинается здесь</span>
          </h1>
          <p
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.15s" }}
          >
            Поиск туров по лучшим ценам от ведущих туроператоров
          </p>
        </div>

        <SearchWidget />

        {/* Trust badges */}
        <div
          className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 md:mt-12 animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          {["Anex Tour", "Pegas Touristik", "Compass"].map((operator) => (
            <span
              key={operator}
              className="text-primary-foreground/60 text-sm font-medium px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm"
            >
              {operator}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-primary-foreground/50" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
