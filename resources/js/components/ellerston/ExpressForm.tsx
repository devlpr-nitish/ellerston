import { Link } from '@inertiajs/react';
import { motion as m } from 'framer-motion';
import type { Variants } from 'motion/react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

const h1_class = 'text-center text-[40px] leading-[44px] tracking-[4%] uppercase';
const h3_class = 'text-[28px] leading-[32px] tracking-[2%] uppercase';
const h5_class = 'text-[20px] leading-[28px] tracking-[2%] uppercase';
const p_class = 'text-[20px] leading-[28px] tracking-[2%]';

const line_style = 'my-[16px] block h-[1px] bg-white';
const button_style =
    'block rounded-[8px] border-[1px] border-solid border-[#fff] p-[12px] text-center text-[16px] leading-[24px] tracking-[12%] uppercase transition delay-150 duration-300 ease-linear hover:bg-white hover:text-black';

gsap.registerPlugin(ScrollTrigger);

function ExpressForm() {
    useEffect(() => {
        const boxes = gsap.utils.toArray<HTMLElement>('.fade-box');
        boxes.forEach((box) => {
            gsap.fromTo(
                box,
                { opacity: 0, y: 150 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: box,
                        start: 'top 95%',
                        end: 'bottom 75%',
                        scrub: true,
                        toggleActions: 'restart pause reverse pasue',
                        // markers: true,
                    },
                },
            );
        });
    }, []);
    return (
        <m.section
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.3 }}
            className="section relative flex min-h-screen w-full items-center bg-black"
        >
            <m.div variants={cardVariants} className="express_bg absolute top-0 left-0 z-0 h-full w-full"></m.div>
            <div className="relative z-10 mx-auto max-w-[1050px] py-[120px]">
                <div className="in_head m-auto flex max-w-[356px] flex-col items-center">
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
                            <Link className={button_style} href="/">
                                Register interest
                            </Link>
                        </div>
                    </div>
                    <div className="">
                        <h3 className={'fade-box ' + h3_class}>Signature EXPERIENCE</h3>
                        <h5 className={'fade-box ' + h5_class}>2 Days, 1 night</h5>
                        <span className={'fade-box ' + line_style}></span>
                        <p className={'fade-box py-[12px] ' + p_class}>
                            Private access to Ellerston Golf course for two rounds, overnight accommodation and helicopter transport to and from
                            Sydney.
                        </p>
                        <div className="fade-box">
                            <Link className={button_style} href="/">
                                Register interest
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </m.section>
    );
}
const cardVariants: Variants = {
    offscreen: {
        opacity: 0,
        y: 200,
    },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            bounce: 0.3,
            duration: 1.2,
        },
    },
};

export default ExpressForm;
