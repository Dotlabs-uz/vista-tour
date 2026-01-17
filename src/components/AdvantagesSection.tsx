import { BadgeCheck, Headphones, Shield, Wallet } from "lucide-react";

const advantages = [
  {
    icon: Wallet,
    title: "Гарантия лучшей цены",
    description: "Мы подберём для вас тур по самой выгодной цене среди всех туроператоров",
    color: "primary",
  },
  {
    icon: Headphones,
    title: "Поддержка 24/7",
    description: "Наши менеджеры всегда на связи и готовы помочь в любое время суток",
    color: "secondary",
  },
  {
    icon: Shield,
    title: "Надежные туроператоры",
    description: "Работаем только с проверенными партнерами: Anex, Pegas, Compass",
    color: "primary",
  },
  {
    icon: BadgeCheck,
    title: "Опыт и экспертиза",
    description: "Более 10 лет работы в туристической индустрии Узбекистана",
    color: "secondary",
  },
];

const AdvantageCard = ({
  advantage,
  index,
}: {
  advantage: (typeof advantages)[0];
  index: number;
}) => {
  const Icon = advantage.icon;
  const isPrimary = advantage.color === "primary";

  return (
    <div
      className="group relative p-6 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-border hover:shadow-card-hover transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Icon */}
      <div
        className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${
          isPrimary ? "bg-primary/10" : "bg-secondary/10"
        }`}
      >
        <Icon
          className={`w-7 h-7 md:w-8 md:h-8 ${
            isPrimary ? "text-primary" : "text-secondary"
          }`}
        />
      </div>

      {/* Content */}
      <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {advantage.title}
      </h3>
      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
        {advantage.description}
      </p>

      {/* Decorative element */}
      <div
        className={`absolute top-0 right-0 w-24 h-24 rounded-bl-[100px] opacity-5 transition-opacity duration-300 group-hover:opacity-10 ${
          isPrimary ? "bg-primary" : "bg-secondary"
        }`}
      />
    </div>
  );
};

const AdvantagesSection = () => {
  return (
    <section id="advantages" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-full mb-4">
            Преимущества
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Почему выбирают
            <span className="text-primary"> okeytour.uz</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Мы создаём незабываемые путешествия для наших клиентов с 2014 года
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((advantage, index) => (
            <AdvantageCard key={advantage.title} advantage={advantage} index={index} />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { value: "10+", label: "Лет опыта" },
            { value: "15K+", label: "Довольных клиентов" },
            { value: "50+", label: "Направлений" },
            { value: "4.9", label: "Рейтинг" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-muted/50 animate-fade-in"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
