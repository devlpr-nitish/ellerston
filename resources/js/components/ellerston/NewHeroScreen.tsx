import { Link } from '@inertiajs/react';
import { motion as m } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { scrollToTarget } from './utils/scrollToTarget';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function NewHeroScreen() {
    const containerRef = useRef<HTMLDivElement>(null);
    const autoScrollTweenRef = useRef<gsap.core.Tween | null>(null);

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
            <div ref={containerRef} className="relative flex h-screen flex-col items-center justify-center">
                <div className="text-center">
                    <span className='text-5xl md:text-7xl tracking-widest'>ELLERSTON</span>
                </div>
            </div>
        </section>
    );
}

export default NewHeroScreen;
