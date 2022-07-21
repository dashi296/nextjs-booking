import Image from "next/image";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = ["/images/top1.jpg", "/images/top2.jpg"];

const TopCarousel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      navigation
      loop
      autoplay
    >
      {images.map((image) => {
        return (
          <SwiperSlide key={image}>
            <Image
              src={image}
              layout="responsive"
              width={640}
              height={400}
              alt="top-image"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default TopCarousel;
