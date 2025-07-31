import React, { useRef, useState, useEffect } from 'react';
import Ellerston from '../../assets/video/Ellerston.mov';
import EllerstonPoster from '../../assets/img/video_cover.png';

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
        <section id="video_wrap" className="video_wrap relative w-screen h-screen bg-black overflow-hidden opacity-0">
            <video
                ref={videoRef}
                src={Ellerston}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
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
                    className="w-full h-full object-cover transition-opacity duration-700"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePlay();
                        }}
                        className={`
                            text-white bg-black/60 backdrop-blur px-12 py-10 rounded-full text-2xl cursor-pointer font-semibold border-4 border-white transition-all duration-700
                            ${showOverlay ? 'opacity-100' : 'opacity-0'}
                        `}
                    >
                        ▶
                    </button>
                </div>
            </div>
        </section>
    );
};

export default VideoPage;
