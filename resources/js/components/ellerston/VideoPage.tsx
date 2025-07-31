import React, { useRef, useState, useEffect } from 'react';
import Ellerston from '../../assets/video/Ellerston.mov';
import EllerstonPoster from '../../assets/img/video_cover.png';
import EllerstonBg from '../../assets/img/phone_video_cover.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showOverlay, setShowOverlay] = useState(true);

    const handlePlay = () => {
        videoRef.current?.play();
        setIsPlaying(true);
        setTimeout(() => setShowOverlay(false), 0);
    };

    useEffect(() => {
        ScrollTrigger.create({
            trigger: '.video_wrap',
            start: 'top 20%',
            end: 'bottom 40%',
            toggleActions: 'restart none restart none',
            onEnter: () => {
                gsap.to('.video_wrap', {
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power2.out',
                });
            },
            onLeave: () => {
                gsap.to('.video_wrap', {
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.in',
                });
            },
            onLeaveBack: () => {
                gsap.to('.video_wrap', {
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.in',
                });
            },
            onEnterBack: () => {
                gsap.to('.video_wrap', {
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power2.out',
                });
            },
            markers: false,
            invalidateOnRefresh: true,
        });

        ScrollTrigger.refresh();
    }, []);

    useEffect(() => {
        if (!isPlaying) return;

        const handlePauseOnClick = () => {
            if (videoRef.current) {
                videoRef.current.pause();
                setIsPlaying(false);
                setShowOverlay(true);
            }

            document.removeEventListener('click', handlePauseOnClick);
        };

        setTimeout(() => {
            document.addEventListener('click', handlePauseOnClick);
        }, 50);

        return () => {
            document.removeEventListener('click', handlePauseOnClick);
        };
    }, [isPlaying]);

    return (
        <section
            id="video_wrap"
            className="video_wrap relative w-full min-h-screen bg-black opacity-0 flex items-center justify-center overflow-hidden"
        >
            <div className="absolute inset-0 z-0">
                <img
                    src={EllerstonBg}
                    alt="Background"
                    className="w-full h-full object-cover blur-md sm:blur-0"
                />
            </div>

            <video
                ref={videoRef}
                src={Ellerston}
                muted
                loop
                playsInline
                className="absolute inset-0 z-10 w-full h-full object-contain sm:object-cover"
            />

            <div
                className={`
                    absolute inset-0 z-20 transition-all duration-700 ease-in-out
                    ${showOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                `}
            >
                <img
                    src={EllerstonPoster}
                    alt="Cover"
                    className="w-full h-full object-contain sm:object-cover transition-opacity duration-700"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePlay();
                        }}
                        className="text-white"
                    >
                        <svg
                            className={`
                                rounded-full text-xl md:text-2xl cursor-pointer font-semibold transition-all duration-700
                                ${showOverlay ? 'opacity-100' : 'opacity-0'}
                            `}
                            fill="#ffffff"
                            height="160px"
                            width="160px"
                            viewBox="0 0 60 60"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g>
                                <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30 c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15 C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"></path>
                                <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30 S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"></path>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default VideoPage;
