import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import antalyaImg from "@/assets/destinations/antalya.jpg";
import dubaiImg from "@/assets/destinations/dubai.jpg";
import egyptImg from "@/assets/destinations/egypt.jpg";
import maldivesImg from "@/assets/destinations/maldives.jpg";
import sharmImg from "@/assets/destinations/sharm.jpg";
import thailandImg from "@/assets/destinations/thailand.jpg";

const destinations = [
  {
    id: 1,
    name: "Анталия, Турция",
    image: antalyaImg,
    price: "от $450",
    tag: "Популярное",
  },
  {
    id: 2,
    name: "Дубай, ОАЭ",
    image: dubaiImg,
    price: "от $680",
    tag: "Хит продаж",
  },
  {
    id: 3,
    name: "Каир, Египет",
    image: egyptImg,
    price: "от $520",
    tag: null,
  },
  {
    id: 4,
    name: "Мальдивы",
    image: maldivesImg,
    price: "от $1200",
    tag: "Премиум",
  },
  {
    id: 5,
    name: "Шарм-эль-Шейх",
    image: sharmImg,
    price: "от $480",
    tag: "Горящий тур",
  },
  {
    id: 6,
    name: "Пхукет, Таиланд",
    image: thailandImg,
    price: "от $890",
    tag: null,
  },
];

const DestinationCard = ({
  destination,
  index,
}: {
  destination: (typeof destinations)[0];
  index: number;
}) => {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer animate-scale-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <Image
        src={destination.image}
        alt={destination.name}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 destination-card-overlay transition-opacity duration-300" />

      {/* Tag */}
      {destination.tag && (
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full shadow-lg">
            {destination.tag}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h3 className="text-lg font-bold text-primary-foreground mb-1 group-hover:text-primary transition-colors">
          {destination.name}
        </h3>
        <p className="text-primary-foreground/90 font-semibold text-sm mb-3">
          {destination.price} <span className="font-normal opacity-70">за чел.</span>
        </p>
        <div className="flex items-center gap-2 text-primary-foreground/70 group-hover:text-primary transition-colors">
          <span className="text-sm font-medium">Подробнее</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-colors duration-300" />
    </div>
  );
};

const DestinationsSection = () => {
  return (
    <section id="destinations" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            Направления
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Популярные направления
            <span className="text-primary"> из Узбекистана</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Откройте для себя лучшие туристические направления с вылетом из Ташкента
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {destinations.map((destination, index) => (
            <DestinationCard key={destination.id} destination={destination} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="group">
            Смотреть все направления
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
