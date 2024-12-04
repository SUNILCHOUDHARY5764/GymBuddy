import React, { useEffect } from 'react';
import Pan1 from "../images/pan1.mp4";
import Pan2 from "../images/pan2.mp4";
import Pan3 from "../images/pan3.mp4";
import Pan4 from "../images/pan4.mp4";
import Pan5 from "../images/pan5.mp4";
import Pan6 from "../images/pan6.mp4";
import * as Aos from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Yoga = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  // Settings for the Slick slider
  const videoSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const youtubeSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="bg-gray-900 text-white">
      {/* Video slideshow */}
      <Slider {...videoSliderSettings} className="my-8 mx-auto max-w-5xl">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-8 px-4">
          <video className="w-full lg:w-1/2" autoPlay loop muted data-aos="fade-center">
            <source src={Pan1} />
          </video>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 text-center lg:text-left" data-aos="fade-left">
            <h2 className="text-3xl lg:text-center font-bold mb-4">Do Not Make Excuses</h2>
            <p className="text-lg lg:text-center mb-4 lg:pr-10">Exercise plays a crucial role...</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-8 px-4">
          <video className="w-full lg:w-1/2" autoPlay loop muted data-aos="fade-center">
            <source src={Pan2} />
          </video>
          <div className="w-full lg:w-1/2 text-center lg:text-center" data-aos="fade-right">
            <h2 className="text-3xl lg:text-center font-bold mb-4">Stretching is Compulsory</h2>
            <p className="text-lg lg:text-center mb-4 lg:pr-10">Regular stretching exercises...</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-8 px-4">
          <video className="w-full lg:w-1/2" autoPlay loop muted data-aos="fade-center">
            <source src={Pan3} />
          </video>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 text-center lg:text-left" data-aos="fade-left">
            <h2 className="text-3xl lg:text-center font-bold mb-4">Importance Of Meditation</h2>
            <p className="text-lg lg:text-center mb-4 lg:pr-10">Meditation is a practice...</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-8 px-4 min-h-screen">
          <video className="w-full lg:w-1/2" autoPlay loop muted data-aos="fade-center">
            <source src={Pan4} />
          </video>
          <div className="w-full lg:w-1/2 text-center lg:text-center" data-aos="fade-right">
            <h2 className="text-3xl font-bold mb-4">Strength</h2>
            <p className="text-lg mb-4 lg:pr-10">Strength is essential...</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-8 px-4">
          <video className="w-full lg:w-1/2" autoPlay loop muted data-aos="fade-center">
            <source src={Pan5} />
          </video>
          <div className="w-full lg:w-1/2 text-center lg:text-center" data-aos="fade-right">
            <h2 className="text-3xl lg:text-center font-bold mb-4">Yoga</h2>
            <p className="text-lg lg:text-center mb-4 lg:pr-10">Yoga strengthens the body and mind...</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-8 px-4">
          <video className="w-full lg:w-1/2" autoPlay loop muted data-aos="fade-center">
            <source src={Pan6} />
          </video>
          <div className="w-full lg:w-1/2 text-center lg:text-center" data-aos="fade-right">
            <h2 className="text-3xl lg:text-center font-bold mb-4">Yoga</h2>
            <p className="text-lg lg:text-center mb-4 lg:pr-10">Yoga enhances balance and inner peace...</p>
          </div>
        </div>
      </Slider>

      <h1 className="text-3xl lg:text-4xl font-bold text-center my-12">Videos That Can Help</h1>

      {/* YouTube slideshow */}
      <Slider {...youtubeSliderSettings} className="justify-center mx-auto my-10 max-w-3xl">
        <div className="flex justify-center">
          <iframe
            data-aos="fade-right"
            className="w-full"
            style={{ width: '560px', height: '315px' }} // Set fixed width and height here
            src="https://www.youtube.com/embed/sOuKeVuej9E"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div className="flex justify-center">
          <iframe
            data-aos="fade-left"
            className="w-full"
            style={{ width: '560px', height: '315px' }}
            src="https://www.youtube.com/embed/DulNz2CkoHI"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div className="flex justify-center">
          <iframe
            data-aos="fade-right"
            className="w-full"
            style={{ width: '560px', height: '315px' }}
            src="https://www.youtube.com/embed/3XVGDYuPay4"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div className="flex justify-center">
          <iframe
            data-aos="fade-left"
            className="w-full"
            style={{ width: '560px', height: '315px' }}
            src="https://www.youtube.com/embed/sSiA25XlG_A"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </Slider>
    </div>
  );
};

export default Yoga;