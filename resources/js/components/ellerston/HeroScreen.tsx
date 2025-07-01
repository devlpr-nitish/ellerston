import { Link } from '@inertiajs/react';
import { motion as m } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const texts = [
    'SET WITHIN A SECLUDED FAMILY SANCTUARY',
    'CARVED FROM AN ANCIENT LAND.',
    'A COURSE FEW WILL EVER PLAY',
    'ALL YOURS',
    'IF ONLY FOR A MOMENT',
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

                tl.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 1 });
                if (i === 2) {
                    tl.fromTo('.keep_scrooling, .scroll-down', { opacity: 0 }, { opacity: 1, duration: 1, color: '#9d9d9d' });
                }

                if (i < texts.length - 1) {
                    tl.to(slide, { opacity: 0, duration: 1, delay: 1 });
                } else {
                    tl.to('.keep_scrooling, .scroll-down', { color: '#fff' });
                    tl.fromTo('.homescreen', { opacity: 0.3 }, { opacity: 1, duration: 1 });
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
                invalidateOnRefresh: true,
            });

            scrollTriggerRef.current = st;
            ScrollTrigger.refresh();

            const scrollEnd = st.end; // OR manually calculate
            const scrollToY = containerRef.current!.offsetTop + containerRef.current!.offsetHeight;
            // const scrollToY = containerRef.current!.offsetTop + st.end!;
            const autoScroll = gsap.to(window, {
                scrollTo: { y: scrollToY, autoKill: true },
                duration: texts.length * 2,
                ease: 'none',
                onUpdate: () => {
                    ScrollTrigger.update();
                },
            });
            autoScrollTweenRef.current = autoScroll;

            const killAutoScroll = () => {
                autoScroll.kill();
                window.removeEventListener('wheel', killAutoScroll);
                window.removeEventListener('touchstart', killAutoScroll);
            };

            window.addEventListener('wheel', killAutoScroll);
            window.addEventListener('touchstart', killAutoScroll);

            const handleScrollInterrupt = (direction: 'enter' | 'enterBack' | 'leave' | 'leaveBack') => {
                // Kill any running auto-scroll
                autoScrollTweenRef.current?.kill();
                if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);

                restartTimeoutRef.current = setTimeout(() => {
                    const st = scrollTriggerRef.current;
                    const currentScroll = window.scrollY;
                    const targetScroll = containerRef.current!.offsetTop + st!.end;

                    const remainingScroll = targetScroll - currentScroll;
                    if (remainingScroll <= 0) return;

                    // Reset timeline progress based on scroll position
                    const totalScrollLength = st!.end;
                    const progress = (currentScroll - containerRef.current!.offsetTop) / totalScrollLength;
                    timelineRef.current?.pause().progress(progress).play();

                    // Restart auto-scroll
                    autoScrollTweenRef.current = gsap.to(window, {
                        scrollTo: { y: targetScroll, autoKill: true },
                        duration: texts.length * 2 * (remainingScroll / totalScrollLength),
                        ease: 'none',
                        onUpdate: () => ScrollTrigger.update(),
                    });
                }, 3000);
            };
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                onEnter: () => handleScrollInterrupt('enter'),
                onEnterBack: () => handleScrollInterrupt('enterBack'),
                onLeave: () => handleScrollInterrupt('leave'),
                onLeaveBack: () => handleScrollInterrupt('leaveBack'),
            });

            const handleScrollCheck = () => {
                const st = scrollTriggerRef.current;
                const containerTop = containerRef.current!.offsetTop;
                const containerBottom = containerTop + st!.end;

                const currentScroll = window.scrollY;

                // Check if user is scrolling within the pinned section
                if (currentScroll >= containerTop && currentScroll <= containerBottom) {
                    handleScrollInterrupt('within');
                }
            };

            // Debounce to avoid firing too rapidly
            let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

            const debouncedScroll = () => {
                if (scrollTimeout) clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(handleScrollCheck, 100);
            };

            window.addEventListener('scroll', debouncedScroll, { passive: true });
        }, containerRef);

        return () => {
            ctx.revert();
            if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
        };
    }, []);
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });

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
                <div className="keep_scrooling z-10 w-full p-[10px] text-center text-[14px] leading-[24px] tracking-[12%]">
                    <Link href="#experience_wrap" className="scroll-link">
                        KEEP SCROLLING
                    </Link>
                </div>
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
