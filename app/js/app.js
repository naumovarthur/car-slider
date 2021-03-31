//@ts-check
import {
  Controller,
  Mousewheel,
  Navigation,
  Pagination,
  Parallax,
  Scrollbar,
  Swiper,
} from "swiper";
import { gsap, Power2 } from "gsap";

import MicroModal from "micromodal";

Swiper.use([
  Parallax,
  Mousewheel,
  Controller,
  Pagination,
  Scrollbar,
  Navigation,
]);

document.addEventListener("DOMContentLoaded", () => {
  MicroModal.init({
    openTrigger: "data-micromodal-open",
    closeTrigger: "data-micromodal-close",
    disableFocus: true,
    disableScroll: true,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true,
  });
  const sliderImg = new Swiper(".slider-img", {
    loop: false,
    speed: 2400,
    parallax: true,
    mousewheel: {
      invert: false,
    },
    pagination: {
      el: ".slider-pagination-count .total",
      type: "custom",
      renderCustom: function (swiper, current, total) {
        return total >= 10 ? total : `0${total}`;
      },
    },
  });

  const sliderText = new Swiper(".slider-text", {
    loop: false,
    speed: 2400,
    mousewheel: {
      invert: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  sliderImg.controller.control = sliderText;
  sliderText.controller.control = sliderImg;

  let gear = document.querySelector(".slider-gear");

  sliderText.on("slideNextTransitionStart", () => {
    gsap.to(gear, {
      rotation: "+=40",
      ease: Power2.easeOut,
      duration: 2.8,
    });
  });

  sliderText.on("slidePrevTransitionStart", () => {
    gsap.to(gear, {
      rotation: "-=40",
      ease: Power2.easeOut,
      duration: 2.8,
    });
  });

  let currNum = document.querySelector(".slider-pagination-count .current"),
    pageNum = document.querySelector(".slider-pagination-current__num");

  sliderText.on("slideChange", function () {
    let index = sliderText.realIndex + 1;
    let indexRes = index >= 10 ? `${index}` : `0${index}`;
    gsap.to(currNum, {
      force3D: true,
      y: -10,
      opacity: 0,
      ease: Power2.easeOut,
      onComplete: function () {
        gsap.to(currNum, {
          force3D: true,
          y: 10,
          duration: 0.1,
        });
        currNum.innerHTML = indexRes;
      },
      duration: 0.2,
    });
    gsap.to(currNum, {
      force3D: true,
      y: 0,
      opacity: 1,
      ease: Power2.easeOut,
      delay: 0.3,
      duration: 0.2,
    });

    gsap.to(pageNum, {
      opacity: 0,
      onComplete: function () {
        pageNum.innerHTML = indexRes;
      },
      duration: 0.4,
    });
    gsap.to(pageNum, {
      opacity: 1,
      delay: 0.5,
      duration: 0.4,
    });
  });

  // Cursor
  const body = document.querySelector("body"),
    cursor = document.getElementById("cursor"),
    links = document.getElementsByTagName("a");

  let mouseX = 0,
    mouseY = 0,
    posX = 0,
    posY = 0;

  /**
   * @param {MouseEvent} event
   */
  function mouseCoords(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
  }

  gsap.to(
    {},
    {
      repeat: -1,
      onRepeat: function () {
        posX += (mouseX - posX) / 6;
        posY += (mouseY - posY) / 6;
        gsap.set(cursor, {
          css: {
            left: posX,
            top: posY,
          },
        });
      },
      duration: 0.01,
    }
  );

  [...links].map((link) => {
    link.addEventListener("mouseover", () => cursor.classList.add("active"));
    link.addEventListener("mouseout", () => cursor.classList.remove("active"));
  });

  body.addEventListener("mousemove", function (event) {
    mouseCoords(event);
    cursor.classList.remove("hidden");
  });

  body.addEventListener("mouseout", function () {
    cursor.classList.add("hidden");
  });
});
