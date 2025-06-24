import { motion as m } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const texts = [
    'NESTLED WITHIN A FAMILY SANCTUARY.',
    'CARVED FROM AN ANCIENT LAND.',
    'A COURSE FEW WILL EVER PLAY',
    'ALL YOURS',
    'IF ONLY FOR A DAY',
    'WELCOME TO ELLERSTON GOLF.',
];

function HeroScreen() {
    const containerRef = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<HTMLDivElement[]>([]);
    const scrollTriggerRef = useRef<ScrollTrigger>();
    const timelineRef = useRef<gsap.core.Timeline>();
    const autoScrollTweenRef = useRef<gsap.core.Tween>();
    const restartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const createTimeline = () => {
            const tl = gsap.timeline();

            texts.forEach((_, i) => {
                const slide = slidesRef.current[i];
                if (!slide) return;
                if (i === 0) {
                    tl.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 1.5, delay: 2 });
                } else {
                    tl.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 1.5 });
                }
                if (i < texts.length - 1) {
                    tl.to(slide, { opacity: 0, duration: 1.5, delay: 3 });
                } else {
                    tl.fromTo('.homescreen', { opacity: 0.3 }, { opacity: 1, duration: 1 });
                    tl.fromTo('.keep_scrooling, .scroll-down', { opacity: 0 }, { opacity: 1, duration: 1 });
                }
            });

            return tl;
        };

        const ctx = gsap.context(() => {
            const tl = createTimeline();
            timelineRef.current = tl;

            const st = ScrollTrigger.create({
                animation: tl,
                trigger: containerRef.current,
                pin: true,
                scrub: true,
                start: 'top top',
                end: `+=${texts.length * window.innerHeight * 0.6}px`,
            });

            scrollTriggerRef.current = st;
            ScrollTrigger.refresh();

            const scrollEnd = st.end; // OR manually calculate
            const scrollToY = containerRef.current!.offsetTop + texts.length * window.innerHeight * 0.6;
            // const scrollToY = containerRef.current!.offsetTop + st.end!;
            const autoScroll = gsap.to(window, {
                scrollTo: { y: scrollToY, autoKill: true },
                duration: texts.length * 4,
                ease: 'none',
            });
            autoScrollTweenRef.current = autoScroll;

            const killAutoScroll = () => {
                autoScroll.kill();
                window.removeEventListener('wheel', killAutoScroll);
                window.removeEventListener('touchstart', killAutoScroll);
            };

            window.addEventListener('wheel', killAutoScroll);
            window.addEventListener('touchstart', killAutoScroll);

            // Handle restart on scroll back
            let hasScrolledPastOnce = false;

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                markers: false,
                onLeave: () => {
                    hasScrolledPastOnce = true;
                    if (!hasScrolledPastOnce) return; // Prevent retrigger on first scroll-through

                    if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);

                    restartTimeoutRef.current = setTimeout(() => {
                        const st = scrollTriggerRef.current!;
                        const currentScroll = window.scrollY;
                        const targetScroll = containerRef.current!.offsetTop + st.end!;
                        const remainingScroll = targetScroll - currentScroll;

                        if (remainingScroll <= 0) return;

                        // Optional: rewind and replay timeline
                        //timelineRef.current?.pause(0).play();
                        timelineRef.current?.seek(0).restart();

                        // Restart scroll animation
                        autoScrollTweenRef.current?.kill();

                        autoScrollTweenRef.current = gsap.to(window, {
                            scrollTo: { y: targetScroll, autoKill: true },
                            duration: texts.length * 4 * (remainingScroll / st.end!),
                            ease: 'none',
                        });
                    }, 3000);
                },
                onUpdate: () => {
                    console.log('stay');
                },
                onLeaveBack: () => {
                    if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
                },
            });
        }, containerRef);

        return () => {
            ctx.revert();
            if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
        };
    }, []);

    return (
        <section className="section relative min-h-screen w-full overflow-hidden bg-black">
            <div ref={containerRef} className="relative flex h-screen flex-col items-end justify-end">
                <div className="homescreen absolute top-0 left-0 z-0 h-screen w-full"></div>
                <div className="relative mb-[16px] h-[100px] w-full">
                    {texts.map((text, i) => (
                        <div
                            className="absolute right-0 bottom-0 left-0 text-center text-[28px] leading-[32px] tracking-[2%] opacity-0"
                            key={i}
                            ref={(el) => (slidesRef.current[i] = el!)}
                        >
                            {text}
                        </div>
                    ))}
                </div>
                <div className="keep_scrooling z-10 w-full p-[10px] text-center text-[14px] leading-[24px] tracking-[12%]">KEEP SCROLLING</div>
                <div className="scroll-down overflow-hidden">
                    <m.span
                        className="mx-auto block h-[33px] w-[2px] bg-white"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0, 1, 0], y: 60 }}
                        transition={{
                            delay: 3,
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: 'loop',
                            repeatDelay: 1,
                            ease: 'easeInOut',
                        }}
                    />
                </div>
            </div>
        </section>
    );
}

export default HeroScreen;
