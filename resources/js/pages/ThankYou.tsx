import { gsap } from 'gsap';
import ScrollSmoother from 'gsap/ScrollSmoother';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { h3_class, h5_class, line_style } from './CssClasses';

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
            ease: 'power2.in',
            onComplete: () => {
                onClose();
            },
        });
        gsap.to('.popup_wrap', {
            opacity: 0,
            duration: 0.4,
            delay: 0.6,
            ease: 'power2.in',
            onComplete: () => {
                onClose();
            },
        });
    };
    return (
        <section className="popup_wrap fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-white/90">
            <div ref={modalRef} className="relative p-[10vw]">
                <div className="thanks_bg absolute top-0 left-0 z-0 h-full w-full"></div>
                <div className="relative z-10 mx-auto flex max-w-[1050px] flex-col items-center justify-center py-[120px]">
                    <div className="in_head mx-auto flex max-w-[630px] flex-col items-center">
                        <h1 className={'fade-box ' + h3_class}>THANK YOU FOR REGISTERING YOUR INTEREST.</h1>
                        <span className={line_style + ' fade-box my-[24px] w-full'}></span>
                        <h5 className={h5_class + ' fade-box mb-[24px]'}>THE ELLERSTON GOLF TEAM WILL BE IN TOUCH IN DUE COURSE.</h5>
                        <button
                            onClick={handleClose}
                            className="fade-box z-10 w-full cursor-pointer p-[10px] text-center text-[14px] leading-[24px] tracking-[12%]"
                        >
                            BACK TO EXPERIENCES
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ThankYou;
