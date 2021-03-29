//@ts-check
import {Swiper, Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation} from 'swiper'
Swiper.use([Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation])

import {gsap, Power2} from 'gsap'

import MicroModal from 'micromodal'

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
				let totalRes = total >= 10 ? total : `0${total}`
				return totalRes
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

	let curnum = document.querySelector('.slider-pagination-count .current'),
		pagnum = document.querySelector('.slider-pagination-current__num')
	
	sliderText.on('slideChange', function() {
		let index = sliderText.realIndex + 1
		let indexRes = index >= 10 ? `${index}` : `0${index}`
		gsap.to(curnum, .2, {
			force3D: true,
			y: -10,
			opacity: 0,
			ease: Power2.easeOut,
			onComplete: function() {
				gsap.to(curnum, .1, {
					force3D: true,
					y: 10
				})
				curnum.innerHTML = indexRes
			}
		})
		gsap.to(curnum, .2, {
			force3D: true,
			y: 0,
			opacity: 1,
			ease: Power2.easeOut,
			delay: .3
		})

		gsap.to(pagnum, .4, {
			opacity: 0,
			onComplete: function() {
				pagnum.innerHTML = indexRes
			}
		})
		gsap.to(pagnum, .4, {
			opacity: 1,
			delay: .5
		})
	})
})
