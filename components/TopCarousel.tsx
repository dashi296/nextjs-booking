import Image from "next/image";
import { Pagination, EffectFade, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Box } from "@mui/material";

const images = ["/images/top1.jpg", "/images/top2.jpg"];

const TopCarousel = () => {
  return (
    <Swiper
      modules={[Pagination, EffectFade, Autoplay]}
      effect="fade"
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      loop
    >
      {images.map((image) => {
        return (
          <SwiperSlide key={image}>
            <Box sx={{ width: "100vw", height: "100vh" }}>
              <Image
                src={image}
                layout="fill"
                alt="top-image"
                objectFit="cover"
              />
            </Box>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default TopCarousel;
