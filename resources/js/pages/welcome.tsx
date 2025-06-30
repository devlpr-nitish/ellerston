import ExpressYourInterest from '@/components/ellerston/ExpressYourInterest';
import HeroScreen from '@/components/ellerston/HeroScreen';
import TopBar from '@/components/ellerston/TopBar';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import '../assets/css/custom.css';

import ClassicExperience from '@/components/ellerston/ClassicExperience';
import SignatureExperience from '@/components/ellerston/SignatureExperience';
import ThankYou from '@/components/ellerston/ThankYou';
import gsap from 'gsap';
import ScrollSmoother from 'gsap/ScrollSmoother';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const expressRef = useRef<HTMLDivElement>(null); // add this at the top with your other refs

    useEffect(() => {
        if (!wrapperRef.current || !contentRef.current) return;

        const smoother = ScrollSmoother.create({
            wrapper: wrapperRef.current,
            content: contentRef.current,
            smooth: 1.2,
            effects: true,
        });

        return () => {
            smoother.kill();
        };
    }, []);

    const [showClassicExperience, setShowClassicExperience] = useState(false);
    const [showSignatureExperience, setShowSignatureExperience] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const contactRef = useRef<HTMLDivElement>(null);

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const scrollToContent = (source: string) => {
        if (source === 'classic') {
            setShowSignatureExperience(false);
            setShowClassicExperience(true);
            // Scroll after it appears
            setTimeout(() => {
                if (contactRef.current) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: contactRef.current.offsetTop,
                        ease: 'power2.out',
                        delay: 0.3,
                    });
                }
            }, 100); // ensure DOM mount
        }
        if (source === 'signature') {
            setShowClassicExperience(false);
            setShowSignatureExperience(true);

            // Scroll after it appears
            setTimeout(() => {
                if (contactRef.current) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: contactRef.current.offsetTop,
                        ease: 'power2.out',
                        delay: 0.3,
                    });
                }
            }, 100); // ensure DOM mount
        }
    };
    const handleCloseThankYou = async () => {
        // Step 1: Hide form
        setShowClassicExperience(false);
        setShowSignatureExperience(false);

        // Step 2: Scroll to ExpressYourInterest section
        await delay(300);
        if (expressRef.current) {
            gsap.to(window, {
                duration: 1,
                scrollTo: '#experience_wrap',
                ease: 'power2.out',
            });
        }

        // Step 3: Hide modal (trigger fade out inside modal first)
        await delay(2000);
        setShowThankYou(false);
    };

    return (
        <>
            <TopBar />
            <div ref={wrapperRef}>
                <div ref={contentRef}>
                    <HeroScreen />
                    <ExpressYourInterest onShowContact={scrollToContent} />
                    {showClassicExperience && (
                        <div ref={contactRef}>
                            <ClassicExperience onShowContact={scrollToContent} onSuccess={() => setShowThankYou(true)} />
                        </div>
                    )}
                    {showSignatureExperience && (
                        <div ref={contactRef}>
                            <SignatureExperience onShowContact={scrollToContent} onSuccess={() => setShowThankYou(true)} />
                        </div>
                    )}
                </div>
            </div>
            {showThankYou && <ThankYou onClose={handleCloseThankYou} />}
        </>
    );
}
