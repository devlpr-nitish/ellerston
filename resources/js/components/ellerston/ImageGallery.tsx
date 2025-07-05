import { Link } from '@inertiajs/react';
import gsap from 'gsap';
import ScrollSmoother from 'gsap/ScrollSmoother';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import sitelogo from '../../assets/img/logo.svg';
import slide01 from '../../assets/img/slide01.jpg';
import slide02 from '../../assets/img/slide02.jpg';
import slide03 from '../../assets/img/slide03.jpg';
import { px_72 } from './CssClasses';

gsap.registerPlugin(ScrollSmoother);

const ImageGallery = ({ onClose }: { onClose: () => void }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    const [sliderKey, setSliderKey] = useState(0);

    const slides = [slide01, slide02, slide03];
    const totalSlides = slides.length;

    useEffect(() => {
        const tl = gsap.timeline();
        const fadeFrom = { opacity: 0, y: 50 };
        const fadeTo = {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: 'power3.out',
        };

        const boxes = gsap.utils.toArray<HTMLElement>('.fade-box');
        boxes.forEach((box) => {
            tl.fromTo(box, fadeFrom, fadeTo);
        });
        const smoother = ScrollSmoother.get();
        smoother?.paused(true);
        gsap.fromTo(modalRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.5 });

        return () => {
            smoother?.paused(false);
        };
    }, []);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (index) => setCurrentSlide(index),
        adaptiveHeight: false,
    };

    const goToPrev = () => sliderRef.current?.slickPrev();
    const goToNext = () => sliderRef.current?.slickNext();

    const handleClose = (e) => {
        if (e) e.preventDefault();
        gsap.to(modalRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.5,
            onStart: () => {
                onClose();
            },
        });
    };
    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const handleResize = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setSliderKey((prev) => prev + 1);
                if (sliderRef.current && typeof sliderRef.current?.slickGoTo === 'function') {
                    sliderRef.current?.slickGoTo(currentSlide, true);
                }
            }, 300);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            clearTimeout(timeout);
            window.removeEventListener('resize', handleResize);
        };
    }, [currentSlide]);

    return (
        <div
            ref={modalRef}
            id="imagegallery"
            className="fixed z-50 h-screen w-full bg-black px-[24px] py-[130px] sm:px-[39px] md:px-[49px] lg:px-[59px] xl:px-[69px]"
        >
            <div className={px_72 + ' absolute top-0 right-0 left-0 z-20 flex items-center justify-between py-[24px]'}>
                <div className="logo">
                    <img src={sitelogo} alt="" className="fade-box" />
                </div>
                <div className="top_right">
                    <ul className="m-0 flex list-none p-0">
                        <li>
                            <Link href="#" className="fade-box flex items-center gap-1.5" onClick={handleClose}>
                                <span>Close </span>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.578154 12L0 11.4218L5.42209 6L0 0.578155L0.578154 0L6 5.42209L11.4218 0L12 0.578155L6.57791 6L12 11.4218L11.4218 12L6 6.57791L0.578154 12Z"
                                        fill="white"
                                    />
                                </svg>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="relative flex h-full w-full flex-col">
                {/* Slider area fills available height */}
                <div className="fade-box flex-1 overflow-hidden">
                    <Slider key={sliderKey} ref={sliderRef} {...settings} className="h-full">
                        {slides.map((img, idx) => (
                            <div key={idx} className="flex! h-full items-center justify-center">
                                <img src={img} alt={`Slide ${idx + 1}`} className="mx-auto max-h-full max-w-full object-contain" />
                            </div>
                        ))}
                    </Slider>

                    {/* Counter + Arrows */}
                </div>
                <div className="fade-box absolute bottom-[-58px] left-[50%] flex translate-x-[-50%] items-center gap-4 text-white">
                    <button onClick={goToPrev} className="cursor-pointer">
                        <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.00826 8.99331L10.8503 1.12997L9.83951 0.119141L0.987008 8.99331L9.83951 17.8458L10.8503 16.835L3.00826 8.99331Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                    <span>
                        {currentSlide + 1} / {totalSlides}
                    </span>
                    <button onClick={goToNext} className="cursor-pointer">
                        <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.99174 8.99331L0.149658 1.12997L1.16049 0.119141L10.013 8.99331L1.16049 17.8458L0.149658 16.835L7.99174 8.99331Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
