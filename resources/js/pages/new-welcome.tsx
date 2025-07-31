// Welcome.tsx

import gsap from 'gsap';
import ScrollSmoother from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

import ClassicExperience from '@/components/ellerston/ClassicExperience';
import ExpressYourInterest from '@/components/ellerston/ExpressYourInterest';
import HeroScreen from '@/components/ellerston/HeroScreen';
import ImageGallery from '@/components/ellerston/ImageGallery';
import SignatureExperience from '@/components/ellerston/SignatureExperience';
import ThankYou from '@/components/ellerston/ThankYou';
import TopBar from '@/components/ellerston/TopBar';

import '../assets/css/custom.css';
import NewHeroScreen from '@/components/ellerston/NewHeroScreen';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

export default function Welcome() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const expressRef = useRef<HTMLDivElement>(null);
    const classicRef = useRef<HTMLDivElement>(null);
    const signatureRef = useRef<HTMLDivElement>(null);

    const [activeExperience, setActiveExperience] = useState<'classic' | 'signature' | null>(null);
    const [showImageGallery, setShowImageGallery] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);

    // ScrollSmoother setup
    useEffect(() => {
        if (!wrapperRef.current || !contentRef.current) return;

        const smoother = ScrollSmoother.create({
            wrapper: wrapperRef.current,
            content: contentRef.current,
            smooth: 1.2,
            effects: true,
            smoothTouch: 0.1, // for mobile support
        });

        return () => {
            smoother.kill();
        };
    }, []);

    // Scroll to new experience component
    useEffect(() => {
        if (!activeExperience) return;
        let targetEl: HTMLDivElement | null = null;

        if (activeExperience === 'classic') targetEl = classicRef.current;
        if (activeExperience === 'signature') targetEl = signatureRef.current;

        if (targetEl) {
            const timeout = setTimeout(() => {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: targetEl.offsetTop,
                    ease: 'power2.out',
                    delay: 0.3,
                });
                //ScrollSmoother.get()?.scrollTo(targetEl, true, 'power2.out');
                ScrollTrigger.refresh(); // Ensures triggers are recalculated
            }, 100);

            return () => clearTimeout(timeout);
        }
    }, [activeExperience]);

    // Pause smoother when overlay is active
    useEffect(() => {
        const smoother = ScrollSmoother.get();
        if (showImageGallery || showThankYou) {
            smoother?.paused(true);
        } else {
            smoother?.paused(false);
        }
    }, [showImageGallery, showThankYou]);

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const scrollToContent = (source: string) => {
        if (source === 'classic') {
            setActiveExperience('classic');
        } else if (source === 'signature') {
            setActiveExperience('signature');
        } else if (source === 'imagegallery') {
            setShowImageGallery(true);
        }
    };

    const handleCloseThankYou = async () => {
        setActiveExperience(null);
        await delay(300);
        if (expressRef.current) {
            ScrollSmoother.get()?.scrollTo(expressRef.current, true, 'power2.out');
        }
        await delay(2000);
        setShowThankYou(false);
    };

    const handleCloseGallery = async () => {
        await delay(1000);
        setShowImageGallery(false);
    };

    return (
        <>
            {/* <TopBar onShowContact={scrollToContent} /> */}
            <div ref={wrapperRef}>
                <div ref={contentRef}>
                    <NewHeroScreen />
                </div>
            </div>

            {showImageGallery && <ImageGallery onClose={handleCloseGallery} />}
            {showThankYou && <ThankYou onClose={handleCloseThankYou} />}
        </>
    );
}
