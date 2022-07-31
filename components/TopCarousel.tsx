import Image from "next/image";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const images = ["/images/top1.jpg", "/images/top2.jpg"];

const TopCarousel = () => {
  return (
    <Swiper
      modules={[Pagination, EffectFade]}
      effect="fade"
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      loop
      autoplay
    >
      {images.map((image) => {
        return (
          <SwiperSlide key={image}>
            <Image
              src={image}
              width="100%"
              height="100%"
              layout="responsive"
              alt="top-image"
              objectFit="cover"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default TopCarousel;
