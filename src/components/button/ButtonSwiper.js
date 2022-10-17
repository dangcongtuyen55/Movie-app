import React, { useRef } from "react";

export const ButtonSwiper = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = React.useRef(null);
  return (
    <>
      <div
        id="previousButton"
        onClick={() => swiperRef.current.swiper.slidePrev()}
      >
        prev
      </div>
      <div id="nextButton" onClick={() => swiperRef.current.swiper.slideNext()}>
        next
      </div>
    </>
  );
};
