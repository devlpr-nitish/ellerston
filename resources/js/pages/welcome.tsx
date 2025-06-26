import ExpressYourInterest from '@/components/ellerston/ExpressYourInterest';
import HeroScreen from '@/components/ellerston/HeroScreen';
import TopBar from '@/components/ellerston/TopBar';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import '../assets/css/custom.css';

import ExpressForm from '@/components/ellerston/ExpressForm';
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

    const handleCloseThankYou = () => {
        // Step 1: Hide form
        setShowContact(false);

        // Step 2: Scroll to ExpressYourInterest section
        setTimeout(() => {
            if (expressRef.current) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: expressRef.current.offsetTop,
                    ease: 'power2.out',
                });
            }
        }, 300); // Wait for form to collapse first

        // Step 3: Hide modal (trigger fade out inside modal first)
        setTimeout(() => {
            setShowThankYou(false);
        }, 1000); // After scroll animation
    };

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

    const [showContact, setShowContact] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const contactRef = useRef<HTMLDivElement>(null);

    const scrollToContact = () => {
        // First show the component
        setShowContact(true);

        // Scroll after it appears
        setTimeout(() => {
            if (contactRef.current) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: contactRef.current.offsetTop,
                    ease: 'power2.out',
                    delay: 0.5,
                });
            }
        }, 100); // ensure DOM mount
    };
    return (
        <>
            <TopBar />
            <div ref={wrapperRef}>
                <div ref={contentRef}>
                    <HeroScreen />
                    <ExpressYourInterest onShowContact={scrollToContact} />
                    {showContact && (
                        <div ref={contactRef}>
                            <ExpressForm onShowContact={scrollToContact} onSuccess={() => setShowThankYou(true)} />
                        </div>
                    )}
                </div>
            </div>
            {showThankYou && <ThankYou onClose={handleCloseThankYou} />}
        </>
    );
}
