import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import PropTypes from 'prop-types';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../assets/CSS/slider.css";

export const Slider_Commerce = function (props) {

    const {imgs} = props
  return (
    <div className="py-4 max-w-[100%] flex">

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
            slidesPerView: 1
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          1024: {
            slidesPerView: 2,
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
            className="w-full max-w-[480px] md:max-w-[640px] h-[428px] md:h-[389px] object-cover rounded-xl border-4 border-woodLogo"
            alt="img"
          />
        </SwiperSlide>
        ))}

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </div>
  );
};

Slider_Commerce.propTypes = {
    imgs: PropTypes.array.isRequired
};
