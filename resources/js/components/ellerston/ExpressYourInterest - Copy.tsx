import { Link } from '@inertiajs/react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';
import { button_style, h1_class, h3_class, h5_class, line_style, p_class } from './CssClasses';
import { scrollToTarget } from './utils/scrollToTarget';

gsap.registerPlugin(ScrollTrigger);
function ExpressYourInterest({ onShowContact }) {
    useEffect(() => {
        const tl = gsap.timeline();

        const fadeFrom = { opacity: 0, y: 50 };
        const fadeTo = {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: 'power2.out"',
        };

        tl.fromTo(
            '.express_bg',
            { opacity: 0, y: 100 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.1,
            },
        );

        const boxes = gsap.utils.toArray<HTMLElement>('.fade-box');
        boxes.forEach((box) => {
            tl.fromTo(box, fadeFrom, fadeTo);
        });

        const boxes2 = gsap.utils.toArray<HTMLElement>('.fade-box2 h3 ');
        boxes2.forEach((box2) => {
            tl.fromTo(box2, fadeFrom, fadeTo);
        });

        const boxes3 = gsap.utils.toArray<HTMLElement>('.fade-box2 h5 ');
        boxes3.forEach((box3) => {
            tl.fromTo(box3, fadeFrom, fadeTo);
        });
        const boxes4 = gsap.utils.toArray<HTMLElement>('.fade-box2 > span ');
        boxes4.forEach((box4) => {
            tl.fromTo(
                box4,
                { width: '0' },
                {
                    width: '100%',
                    duration: 0.2,
                    ease: 'power2.out"',
                },
            );
        });
        const boxes5 = gsap.utils.toArray<HTMLElement>('.fade-box2 > p');
        boxes5.forEach((box5) => {
            tl.fromTo(box5, fadeFrom, fadeTo);
        });
        const boxes6 = gsap.utils.toArray<HTMLElement>('.fade-box2 .linkdiv');
        boxes6.forEach((box6) => {
            tl.fromTo(box6, fadeFrom, fadeTo);
        });
        ScrollTrigger.create({
            trigger: '.experience_wrap',
            start: 'top 20%',
            toggleActions: 'restart none restart none',
            animation: tl,
            onEnter: () =>
                gsap.to('.experience_wrap', {
                    opacity: 1,
                    duration: 0.4,
                    ease: 'power2.out',
                }),
            onLeave: () =>
                gsap.to('.experience_wrap', {
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power2.in',
                }),
            onLeaveBack: () =>
                gsap.to('.experience_wrap', {
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power2.in',
                }),
            onEnterBack: () =>
                gsap.to('.experience_wrap', {
                    opacity: 1,
                    duration: 0.4,
                    ease: 'power2.out',
                }),
            markers: false,
            invalidateOnRefresh: true,
        });
        /* ScrollTrigger.create({
            animation: tl,
            trigger: '.experience_wrap',
            start: 'top+=10px 10%',
            end: '+=5%',
            //toggleActions: 'restart none reverse none',
            toggleActions: 'restart none reverse none',
            markers: false,
            invalidateOnRefresh: true,
        });*/
        ScrollTrigger.refresh();
    }, []);

    return (
        <section id="experience_wrap" className="section w-full items-center bg-black">
            <div className="experience_wrap relative min-h-screen">
                <div className="express_bg absolute top-0 left-0 z-0 h-full w-full"></div>
                <div className="relative z-10 mx-auto flex h-full max-w-[1130px] flex-col items-center justify-center py-[120px]">
                    <div className="in_head mx-auto flex flex-col items-center px-[20px]">
                        <h1 className={'fade-box mb-[24px] max-w-[280px] sm:max-w-[320px] md:max-w-[370px] lg:max-w-[386px] ' + h1_class}>
                            ELLERSTON GOLF ALL TO YOURSELF.
                        </h1>
                        <span className="fade-box bg-colo inline-block rounded-[4px] bg-[#0000001f] px-[16px] py-[8px] text-center text-[16px] leading-[24px] tracking-[8%] uppercase md:leading-[32px]">
                            Limited opportunities remaining for 2025
                        </span>
                    </div>

                    <div className="sec_body grid grid-cols-1 gap-[64px] px-[40px] pt-[64px] sm:gap-[5vw] sm:pt-[70px] md:grid-cols-2 md:gap-[8vw] md:pt-[80px] lg:gap-[13vw] lg:pt-[90px] xl:gap-[250px] xl:pt-[110px]">
                        <div className="fade-box2">
                            <h3 className={h3_class}>CLASSIC EXPERIENCE</h3>
                            <h5 className={h5_class}>1 day</h5>
                            <span className={line_style}></span>
                            <p className={'py-[12px] ' + p_class}>
                                Private access to Ellerston Golf course for one round with helicopter transport to and from Sydney.
                            </p>
                            <div className="linkdiv">
                                <Link
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToTarget('#classic_experience');
                                        onShowContact('classic');
                                    }}
                                    className={button_style + ' btn_arrow scroll-link'}
                                    href="#classic_experience"
                                >
                                    <span>
                                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12.8827 7.42301H0.923C0.799833 7.42301 0.6985 7.38335 0.619 7.30401C0.539667 7.22451 0.5 7.12309 0.5 6.99976C0.5 6.87643 0.539667 6.77509 0.619 6.69576C0.6985 6.61659 0.799833 6.57701 0.923 6.57701H12.8827L7.19675 0.903762C7.12408 0.821096 7.08275 0.723512 7.07275 0.611012C7.06275 0.498512 7.10475 0.397095 7.19875 0.306762C7.29275 0.210429 7.39317 0.161929 7.5 0.161262C7.60683 0.160595 7.70725 0.207261 7.80125 0.301261L13.99 6.49001C14.0642 6.56418 14.1204 6.64268 14.1587 6.72551C14.1969 6.80818 14.216 6.90026 14.216 7.00176C14.216 7.1031 14.1969 7.19459 14.1587 7.27626C14.1204 7.35793 14.0642 7.43584 13.99 7.51001L7.80125 13.6988C7.72142 13.7786 7.62542 13.8218 7.51325 13.8283C7.40092 13.8346 7.29608 13.7914 7.19875 13.6988C7.10475 13.6013 7.05775 13.4997 7.05775 13.394C7.05775 13.2882 7.10475 13.1925 7.19875 13.107L12.8827 7.42301Z"
                                                fill=""
                                            />
                                        </svg>
                                        Register interest
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="fade-box2">
                            <h3 className={h3_class}>Signature EXPERIENCE</h3>
                            <h5 className={h5_class}>2 Days, 1 night</h5>
                            <span className={line_style}></span>
                            <p className={'py-[12px] ' + p_class}>
                                Private access to Ellerston Golf course for two rounds, overnight accommodation and helicopter transport to and from
                                Sydney.
                            </p>
                            <div className="linkdiv">
                                <Link
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToTarget('#classic_experience');
                                        onShowContact('signature');
                                    }}
                                    className={button_style + ' btn_arrow scroll-link'}
                                    href="#classic_experience"
                                >
                                    <span>
                                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12.8827 7.42301H0.923C0.799833 7.42301 0.6985 7.38335 0.619 7.30401C0.539667 7.22451 0.5 7.12309 0.5 6.99976C0.5 6.87643 0.539667 6.77509 0.619 6.69576C0.6985 6.61659 0.799833 6.57701 0.923 6.57701H12.8827L7.19675 0.903762C7.12408 0.821096 7.08275 0.723512 7.07275 0.611012C7.06275 0.498512 7.10475 0.397095 7.19875 0.306762C7.29275 0.210429 7.39317 0.161929 7.5 0.161262C7.60683 0.160595 7.70725 0.207261 7.80125 0.301261L13.99 6.49001C14.0642 6.56418 14.1204 6.64268 14.1587 6.72551C14.1969 6.80818 14.216 6.90026 14.216 7.00176C14.216 7.1031 14.1969 7.19459 14.1587 7.27626C14.1204 7.35793 14.0642 7.43584 13.99 7.51001L7.80125 13.6988C7.72142 13.7786 7.62542 13.8218 7.51325 13.8283C7.40092 13.8346 7.29608 13.7914 7.19875 13.6988C7.10475 13.6013 7.05775 13.4997 7.05775 13.394C7.05775 13.2882 7.10475 13.1925 7.19875 13.107L12.8827 7.42301Z"
                                                fill=""
                                            />
                                        </svg>
                                        Register interest
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ExpressYourInterest;
