import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../assets/CSS/slider.css";
import IMG1 from "../../assets/Img/Destinos_01.webp";
import IMG2 from "../../assets/Img/Destinos_02.webp";
import IMG3 from "../../assets/Img/Destinos_03.webp";
import IMG4 from "../../assets/Img/Destinos_04.webp";
import StarRating from "../UI/StartRating";

const imgs = [IMG1, IMG2, IMG3, IMG4, IMG1, IMG2];

export const SliderDestinosPopulares = function () {
  return (
    <div className="swiper-container">

      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
          type:undefined
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 8,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 8,
          },
        }}
        className="mySwiper"
        loop={true}
      >
        {imgs.map((img, i) => (
          <SwiperSlide key={i} className="relative text-center">
          <img
            src={img}
            className="w-[350px] md:w-[259px] h-[428px] md:h-[389px] object-cover rounded-xl border-4 border-woodLogo"
            alt="img"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 to-transparent rounded-xl overflow-hidden">
            <div className="p-4 text-white">
              <h2 className="font-nunito font-[400] text-[28px] pt-[9rem]">
                Lorem ipsum
              </h2>
              <p className="text-tiny font-semibold text-yellow-600/90">A 35 km de su ubicación</p>
              <p className="py-2 font-tyni">
                Price start at <span className="text-freshMint font-medium">$10.00</span>
              </p>
              <div className="flex items-center justify-center">
                <StarRating />
              </div>
              
            </div>
          </div>
        </SwiperSlide>
        ))}

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </div>
  );
};
