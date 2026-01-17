export default function MinPriceWidget() {
  return (
    <section id="destinations" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            Подбор по минимальной цене
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Лучшие предложения
            <span className="text-primary"> прямо сейчас</span>
          </h2>
        </div>

        <div className="tv-min-price tv-moduleid-9987824" />
      </div>
    </section>
  );
}


