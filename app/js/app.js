//@ts-check
import {Swiper, Parallax, Mousewheel, Controller} from 'swiper'
Swiper.use([Parallax, Mousewheel, Controller])

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
		}
	})

	sliderImg.controller.control = sliderText
	sliderText.controller.control = sliderImg
})
