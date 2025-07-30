import { Link } from '@inertiajs/react';
import { motion as m } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { scrollToTarget } from './utils/scrollToTarget';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const texts = [
    'SET WITHIN A SECLUDED FAMILY SANCTUARY',
    'CARVED FROM AN ANCIENT LAND',
    'A COURSE FEW WILL EVER PLAY',
    'ALL YOURS',
    'IF ONLY FOR A DAY',
    'WELCOME TO ELLERSTON GOLF',
];

function HeroScreen() {
    const containerRef = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<HTMLDivElement[]>([]);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const autoScrollTweenRef = useRef<gsap.core.Tween | null>(null);
    const restartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startAutoScroll = () => {
        const container = containerRef.current;
        if (!container) return;

        const targetY = container.offsetTop + container.offsetHeight;

        autoScrollTweenRef.current?.kill();
        autoScrollTweenRef.current = gsap.to(window, {
            scrollTo: { y: targetY, autoKill: true },
            duration: texts.length * 2,
            ease: 'none',
            onUpdate: () => ScrollTrigger.update(),
        });
    };

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
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

            const timeline = createTimeline();
            timelineRef.current = timeline;

            const st = ScrollTrigger.create({
                animation: timeline,
                trigger: containerRef.current,
                pin: true,
                scrub: 0.5,
                start: 'top top',
                end: () => `+=${containerRef.current?.offsetHeight || 0}`,
                invalidateOnRefresh: true,
            });

            scrollTriggerRef.current = st;
            ScrollTrigger.refresh();

            startAutoScroll();

            const killAutoScroll = () => {
                autoScrollTweenRef.current?.kill();
                autoScrollTweenRef.current = null;
                window.removeEventListener('wheel', killAutoScroll);
                window.removeEventListener('touchstart', killAutoScroll);
                window.removeEventListener('touchmove', killAutoScroll);
            };

            window.addEventListener('wheel', killAutoScroll, { passive: true });
            window.addEventListener('touchstart', killAutoScroll, { passive: true });
            window.addEventListener('touchmove', killAutoScroll, { passive: true });

            const handleScrollInterrupt = () => {
                autoScrollTweenRef.current?.kill();
                if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);

                restartTimeoutRef.current = setTimeout(() => {
                    const st = scrollTriggerRef.current;
                    const container = containerRef.current;
                    if (!st || !container) return;

                    const currentScroll = window.scrollY;
                    const containerTop = container.offsetTop;
                    const scrollEnd = typeof st.end === 'function' ? st.end() : (st.end ?? 0);
                    const totalScrollLength = scrollEnd;
                    const progress = (currentScroll - containerTop) / totalScrollLength;
                    const clampedProgress = Math.max(0, Math.min(1, progress));

                    timelineRef.current?.pause();
                    timelineRef.current?.progress(clampedProgress).play();

                    const remainingScroll = containerTop + scrollEnd - currentScroll;
                    if (remainingScroll <= 0) return;

                    autoScrollTweenRef.current = gsap.to(window, {
                        scrollTo: { y: containerTop + scrollEnd, autoKill: true },
                        duration: texts.length * 2 * (remainingScroll / totalScrollLength),
                        ease: 'none',
                        onUpdate: () => ScrollTrigger.update(),
                    });
                }, 3000); // Delay before restart
            };

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                onEnter: handleScrollInterrupt,
                onEnterBack: handleScrollInterrupt,
                onLeave: handleScrollInterrupt,
                onLeaveBack: handleScrollInterrupt,
            });

            const debouncedScroll = () => {
                if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
                scrollTimeoutRef.current = setTimeout(() => {
                    if (!containerRef.current || !scrollTriggerRef.current) return;

                    const containerTop = containerRef.current.offsetTop;
                    const scrollEnd =
                        typeof scrollTriggerRef.current.end === 'function' ? scrollTriggerRef.current.end() : (scrollTriggerRef.current.end ?? 0);

                    const containerBottom = containerTop + scrollEnd;
                    const currentScroll = window.scrollY;

                    if (currentScroll >= containerTop && currentScroll <= containerBottom) {
                        handleScrollInterrupt();
                    }
                }, 100);
            };

            window.addEventListener('scroll', debouncedScroll, { passive: true });

            return () => {
                window.removeEventListener('scroll', debouncedScroll);
                window.removeEventListener('wheel', killAutoScroll);
                window.removeEventListener('touchstart', killAutoScroll);
                window.removeEventListener('touchmove', killAutoScroll);
                scrollTimeoutRef.current && clearTimeout(scrollTimeoutRef.current);
            };
        }, containerRef);

        return () => {
            ctx.revert();
            restartTimeoutRef.current && clearTimeout(restartTimeoutRef.current);
            scrollTimeoutRef.current && clearTimeout(scrollTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

        const handleResize = () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);

            resizeTimeout = setTimeout(() => {
                const container = containerRef.current;
                if (!container) return;

                const scrollY = window.scrollY;
                const containerTop = container.offsetTop;
                const containerBottom = containerTop + container.offsetHeight;

                if (scrollY >= containerTop && scrollY <= containerBottom) {
                    window.scrollTo({ top: containerTop, behavior: 'auto' });

                    ScrollTrigger.refresh();

                    const targetY = container.offsetTop + container.offsetHeight;
                    autoScrollTweenRef.current?.kill();
                    autoScrollTweenRef.current = gsap.to(window, {
                        scrollTo: { y: targetY, autoKill: true },
                        duration: texts.length * 2,
                        ease: 'none',
                        onUpdate: () => ScrollTrigger.update(),
                    });
                }
            }, 200);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (resizeTimeout) clearTimeout(resizeTimeout);
        };
    }, []);

    return (
        <section className="section relative min-h-screen w-full overflow-hidden bg-black">
            <div ref={containerRef} className="relative flex h-screen flex-col items-end justify-end">
                <div className="homescreen absolute top-0 left-0 z-0 h-screen w-full"></div>
                <div className="relative mb-[16px] h-[100px] w-full">
                    {texts.map((text, i) => (
                        <div
                            key={i}
                            ref={(el) => {
                                if (el) slidesRef.current[i] = el;
                            }}
                            className="absolute right-[40px] bottom-0 left-[40px] text-center text-[28px] leading-[32px] tracking-[2%] opacity-0"
                        >
                            {text}
                        </div>
                    ))}
                </div>
                <div className="keep_scrooling z-10 w-full p-[10px] text-center text-[14px] leading-[24px] tracking-[12%]">
                    <Link
                        href="#experience_wrap"
                        className="scroll-link"
                        onClick={(e) => {
                            e.preventDefault();
                            const targetEl = document.querySelector('#experience_wrap');
                            if (targetEl) {
                                scrollToTarget('#experience_wrap');
                            }
                        }}
                    >
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
