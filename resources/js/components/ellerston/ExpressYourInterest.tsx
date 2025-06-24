import { Link } from '@inertiajs/react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';
import { button_style, h1_class, h3_class, h5_class, line_style, p_class } from './CssClasses';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    tl.fromTo(
        '.express_bg1',
        { opacity: 0, y: 100 },
        {
            opacity: 1,
            y: 0,
            duration: 2,
            delay: 1,
        },
    );
    ScrollTrigger.create({
        animation: tl,
        trigger: '.experience_wrap',
        // pin: true,
        //pinSpacing: false,
        scrub: true,
        start: 'top 98%',
        end: '10% 80%',
        //markers: true,
    });
});
function ExpressYourInterest() {
    useEffect(() => {
        const boxes = gsap.utils.toArray<HTMLElement>('.fade-box');
        boxes.forEach((box) => {
            gsap.fromTo(
                box,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.5,
                    scrollTrigger: {
                        trigger: box,
                        start: 'top+=100 bottom',
                        end: 'top+=50 65%',
                        scrub: true,
                        //markers: true,
                    },
                },
            );
        });

        const boxes2 = gsap.utils.toArray<HTMLElement>('.fade-box2');
        boxes2.forEach((box2) => {
            gsap.fromTo(
                box2,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.5,
                    scrollTrigger: {
                        trigger: box2,
                        start: 'top+=200 bottom',
                        end: 'top+=50 65%',
                        scrub: true,
                        markers: false,
                    },
                },
            );
        });
    }, []);
    return (
        <section id="experience_wrap" className="section min-h-screen w-full items-center bg-black">
            <div className="experience_wrap relative h-screen">
                <div className="express_bg absolute top-0 left-0 z-0 h-full w-full"></div>
                <div className="relative z-10 mx-auto flex h-full max-w-[1050px] flex-col items-center justify-center py-[120px]">
                    <div className="in_head mx-auto flex max-w-[356px] flex-col items-center">
                        <h1 className={'fade-box mb-[24px] ' + h1_class}>ELLERSTON GOLF ALL TO YOURSELF.</h1>
                        <span className="fade-box bg-colo inline-block rounded-[4px] bg-[#0000001f] px-[16px] py-[8px] text-[16px] leading-[32px] tracking-[8%] uppercase">
                            8 experiences remaining for 2025
                        </span>
                    </div>

                    <div className="sec_body grid grid-cols-2 gap-[250px] pt-[110px]">
                        <div className="">
                            <h3 className={'fade-box ' + h3_class}>CLASSIC EXPERIENCE</h3>
                            <h5 className={'fade-box ' + h5_class}>1 day</h5>
                            <span className={'fade-box ' + line_style}></span>
                            <p className={'fade-box py-[12px] ' + p_class}>
                                Private access to Ellerston Golf course for one round with helicopter transport to and from Sydney.
                            </p>
                            <div className="fade-box">
                                <Link className={button_style + ' btn_arrow'} href="/">
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
                        <div className="">
                            <h3 className={'fade-box2 ' + h3_class}>Signature EXPERIENCE</h3>
                            <h5 className={'fade-box2 ' + h5_class}>2 Days, 1 night</h5>
                            <span className={'fade-box2 ' + line_style}></span>
                            <p className={'fade-box2 py-[12px] ' + p_class}>
                                Private access to Ellerston Golf course for two rounds, overnight accommodation and helicopter transport to and from
                                Sydney.
                            </p>
                            <div className="fade-box2">
                                <Link className={button_style + ' btn_arrow'} href="/">
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
