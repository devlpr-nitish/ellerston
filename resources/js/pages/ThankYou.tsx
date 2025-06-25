import { h3_class, h5_class, line_style } from '@/components/ellerston/CssClasses';
import Footer from '@/components/ellerston/Footer';
import TopBar from '@/components/ellerston/TopBar';
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import ScrollSmoother from 'gsap/ScrollSmoother';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import '../assets/css/custom.css';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function ThankYou() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

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

    gsap.fromTo(
        '.fade-box',
        { opacity: 0, y: 80 },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.3,
        },
    );
    return (
        <>
            <TopBar />
            <div ref={wrapperRef}>
                <div ref={contentRef}>
                    <section className="section min-h-screen w-full items-center bg-black">
                        <div className="experience_wrap relative h-screen">
                            <div className="thanks_bg absolute top-0 left-0 z-0 h-full w-full"></div>
                            <div className="relative z-10 mx-auto flex h-full max-w-[1050px] flex-col items-center justify-center py-[120px]">
                                <div className="in_head mx-auto flex max-w-[630px] flex-col items-center">
                                    <h1 className={'fade-box ' + h3_class}>THANK YOU FOR REGISTERING YOUR INTEREST.</h1>
                                    <span className={line_style + ' fade-box my-[24px] w-full'}></span>
                                    <h5 className={h5_class + ' fade-box mb-[24px]'}>THE ELLERSTON GOLF TEAM WILL BE IN TOUCH IN DUE COURSE.</h5>
                                    <Link href="/" className="fade-box z-10 w-full p-[10px] text-center text-[14px] leading-[24px] tracking-[12%]">
                                        BACK TO EXPERIENCES
                                    </Link>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default ThankYou;
