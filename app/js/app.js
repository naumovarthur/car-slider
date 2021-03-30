//@ts-check
import {Controller, Mousewheel, Navigation, Pagination, Parallax, Scrollbar, Swiper} from 'swiper'
import {gsap, Power2} from 'gsap'

import MicroModal from 'micromodal'

Swiper.use([Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation])

document.addEventListener('DOMContentLoaded', () => {
	MicroModal.init({
		openTrigger: 'data-micromodal-open',
		closeTrigger: 'data-micromodal-close',
		disableFocus: true,
		disableScroll: true,
		awaitOpenAnimation: true,
		awaitCloseAnimation: true
	})
	const sliderImg = new Swiper('.slider-img', {
		loop: false,
		speed: 2400,
		parallax: true,
		mousewheel: {
			invert: false
		},
		pagination: {
			el: '.slider-pagination-count .total',
			type: 'custom',
			renderCustom: function(swiper, current, total) {
				return total >= 10 ? total : `0${total}`
			}
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
		gsap.to(gear, {
			rotation: "+=40",
			ease: Power2.easeOut,
			duration: 2.8
		})
	})

	sliderText.on('slidePrevTransitionStart', () => {
		gsap.to(gear, {
			rotation: "-=40",
			ease: Power2.easeOut,
			duration: 2.8
		})
	})

	let currNum = document.querySelector('.slider-pagination-count .current'),
		pageNum = document.querySelector('.slider-pagination-current__num')
	
	sliderText.on('slideChange', function() {
		let index = sliderText.realIndex + 1
		let indexRes = index >= 10 ? `${index}` : `0${index}`
		gsap.to(currNum, {
			force3D: true,
			y: -10,
			opacity: 0,
			ease: Power2.easeOut,
			onComplete: function() {
				gsap.to(currNum, {
					force3D: true,
					y: 10,
					duration: .1
				})
				currNum.innerHTML = indexRes
			},
			duration: .2
		})
		gsap.to(currNum, {
			force3D: true,
			y: 0,
			opacity: 1,
			ease: Power2.easeOut,
			delay: .3,
			duration: .2
		})

		gsap.to(pageNum, {
			opacity: 0,
			onComplete: function() {
				pageNum.innerHTML = indexRes
			},
			duration: .4
		})
		gsap.to(pageNum, {
			opacity: 1,
			delay: .5,
			duration: .4
		})
	})
})
