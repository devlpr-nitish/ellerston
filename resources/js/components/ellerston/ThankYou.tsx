import { gsap } from 'gsap';
import ScrollSmoother from 'gsap/ScrollSmoother';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import sitelogo from '../../assets/img/logo.svg';
import { line_style, px_72 } from './CssClasses';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function ThankYou({ onClose }: { onClose: () => void }) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isClosing, setIsClosing] = useState(false);

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

    const handleClose = () => {
        setIsClosing(true);
        gsap.to(modalRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.5,
            onStart: () => {
                onClose();
            },
        });
    };
    return (
        <section className="popup_wrap fixed inset-0 z-50 flex w-full items-center justify-center">
            <div ref={modalRef} className="flex min-h-screen w-full flex-col justify-center overflow-hidden overflow-y-auto py-[124px]">
                <div className={px_72 + ' absolute top-0 right-0 left-0 z-20 flex items-center justify-between py-[24px]'}>
                    <div className="logo">
                        <img src={sitelogo} alt="" className="fade-box" />
                    </div>
                    <div className="top_right">
                        <ul className="m-0 flex list-none p-0">
                            <li>
                                <button className="fade-box flex cursor-pointer items-center gap-1.5" onClick={handleClose}>
                                    <span>Close </span>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0.578154 12L0 11.4218L5.42209 6L0 0.578155L0.578154 0L6 5.42209L11.4218 0L12 0.578155L6.57791 6L12 11.4218L11.4218 12L6 6.57791L0.578154 12Z"
                                            fill="white"
                                        />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="thanks_bg absolute top-0 left-0 z-0 h-full w-full"></div>
                <div className="relative z-10 mx-auto flex max-w-[1050px] flex-col items-center justify-center py-[60px]">
                    <div className="in_head mx-auto flex max-w-[694px] flex-col items-center px-[32px]">
                        <h1 className="fade-box text-center text-[28px] leading-[32px] font-light tracking-[2%] uppercase">
                            THANK YOU FOR REGISTERING YOUR INTEREST.
                        </h1>
                        <span className={line_style + ' fade-box my-[24px] w-full'}></span>
                        <h5 className="fade-box mb-[24px] text-center text-[20px] leading-[28px] font-light tracking-[2%] uppercase">
                            THE ELLERSTON GOLF TEAM WILL BE IN TOUCH.
                        </h5>
                        <button
                            onClick={handleClose}
                            className="fade-box z-10 w-full cursor-pointer p-[10px] text-center text-[14px] leading-[24px] tracking-[12%]"
                        >
                            BACK TO EXPERIENCES
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        </section>
    );
}

export default ThankYou;
