import { AnimatePresence, motion as m } from 'framer-motion';
import { useEffect, useState } from 'react';

const texts: string[] = [
    'NESTLED WITHIN A FAMILY SANCTUARY.',
    'CARVED FROM AN ANCIENT LAND.',
    'A COURSE FEW WILL EVER PLAY',
    'ALL YOURS',
    'IF ONLY FOR A DAY',
    'WELCOME TO ELLERSTON GOLF.',
];

export default function HeroScreenOld() {
    const [index, setIndex] = useState<number>(-1);
    const [showFinal, setShowFinal] = useState<boolean>(false);

    useEffect(() => {
        const startDelay = setTimeout(() => {
            setIndex(0); // Start showing first text
            const interval = setInterval(() => {
                setIndex((prev) => {
                    const nextIndex = prev + 1;

                    // Trigger animation on second-last slide
                    if (nextIndex === texts.length - 1) {
                        setShowFinal(true);
                    }

                    // Stop at the last slide
                    if (nextIndex < texts.length) return nextIndex;
                    clearInterval(interval);
                    return prev;
                });
            }, 3000);
        }, 600);

        return () => clearInterval(startDelay);
    }, []);

    return (
        <section className="section relative min-h-screen w-full bg-black">
            <AnimatePresence mode="wait">
                <m.div
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: showFinal ? 1 : 0.3 }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                    className="homescreen absolute top-0 left-0 z-0 h-full w-full"
                ></m.div>
            </AnimatePresence>
            <div className="relative z-10 min-h-screen w-full">
                <div className="absolute bottom-0 left-0 w-full">
                    <AnimatePresence mode="wait">
                        <m.div
                            className="mb-[26px] text-center text-[28px] leading-[32px] tracking-[2%]"
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: 'easeIn' }}
                        >
                            {texts[index]}
                        </m.div>
                    </AnimatePresence>

                    <AnimatePresence>
                        <m.div
                            className="text-center text-[14px] leading-[24px] tracking-[12%]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: showFinal ? 1 : 0 }}
                            transition={{ duration: 1, delay: 2 }}
                        >
                            KEEP SCROLLING
                        </m.div>
                    </AnimatePresence>

                    <div className="scroll-down overflow-hidden">
                        {showFinal && (
                            <m.span
                                initial={{ opacity: 0, y: 0, height: 33 }}
                                animate={{ opacity: [0, 1, 0], y: 60, height: [33, 60] }}
                                transition={{
                                    delay: 3,
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: 'loop',
                                    repeatDelay: 1,
                                    ease: 'easeInOut',
                                }}
                            ></m.span>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
