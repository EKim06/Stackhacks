import React from "react";
import eboard from "../data/eboard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Card(props) {
  return (
    <div className="px-3">
      <div
        className="
        card
        flex flex-col items-center gap-3
        w-full
        border border-gray-200
        rounded-2xl
        shadow-md
        p-6
        transition-all duration-300
        hover:scale-105
        hover:shadow-2xl
        hover:border-accent
        cursor-pointer"
      >
        <img src={props.image} />
        <h1 className>{props.name}</h1>
        <h3 className="text-accent text-center">{props.title}</h3>
        <p>[Enter Description]</p>
      </div>
    </div>
  );
}

const Eboard = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
  };

  return (
    <div className="w-full px-10 py-10">
      <Slider {...settings}>
        {eboard.map((member, index) => (
          <Card
            key={index}
            title={member.title}
            name={member.name}
            image={member.image}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Eboard;
