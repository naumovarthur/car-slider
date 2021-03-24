//@ts-check
import {Swiper, Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation} from 'swiper'
Swiper.use([Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation])

import {gsap, Power2} from 'gsap'

document.addEventListener('DOMContentLoaded', () => {
	const sliderImg = new Swiper('.slider-img', {
		loop: false,
		speed: 2400,
		parallax: true,
		mousewheel: {
			invert: false
		}
	})

	const sliderText = new Swiper('.slider-text', {
		loop: false,
		speed: 2400,
		mousewheel: {
			invert: false
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		}
	})

	sliderImg.controller.control = sliderText
	sliderText.controller.control = sliderImg

	let gear = document.querySelector('.slider-gear')

	sliderText.on('slideNextTransitionStart', () => {
		gsap.to(gear, 2.8, {
			rotation: "+=40",
			ease: Power2.easeOut
		})
	})

	sliderText.on('slidePrevTransitionStart', () => {
		gsap.to(gear, 2.8, {
			rotation: "-=40",
			ease: Power2.easeOut
		})
	})
})
