import React, { useState, useEffect, useCallback } from "react";
import { useEmblaCarousel } from "embla-carousel-react";
import { DotButton, PrevButton, NextButton } from "./embelaCarouselButtons";
import "./embela-carousel.css";

const EmblaCarouselComponent = ({ children }) => {
  const [EmblaCarouselReact, embla] = useEmblaCarousel({ loop: false });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback(index => embla.scrollTo(index), [embla]);
  const scrollPrev = useCallback(() => embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla.scrollNext(), [embla]);

  useEffect(() => {
    const onSelect = () => {
      setSelectedIndex(embla.selectedScrollSnap());
      setPrevBtnEnabled(embla.canScrollPrev());
      setNextBtnEnabled(embla.canScrollNext());
    };
    if (embla) {
      setScrollSnaps(embla.scrollSnapList());
      embla.on("select", onSelect);
      onSelect();
    }
  }, [embla]);

  return (
    <div className="embla">
      <EmblaCarouselReact className="embla__viewport">
        <div className="embla__container">
          {children.map((Child, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__inner">{Child}</div>
            </div>
          ))}
        </div>
      </EmblaCarouselReact>
      <div className="embla__dots">
        {scrollSnaps.map((snap, index) => (
          <DotButton
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
            key={index}
          />
        ))}
      </div>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </div>
  );
};

export default EmblaCarouselComponent;
