import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import GamesSlide from "./GamesSlide";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full bg-inherit text-primary"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="h-[500px] pl-12 text-white">
            {/* <GamesSlide /> */}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-inherit" variant="default" />
      <CarouselNext className="bg-inherit" variant="default" />
    </Carousel>
  );
}
