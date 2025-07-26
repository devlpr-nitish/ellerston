import React, { useRef, useState, useEffect } from 'react';
import Ellerston from '../../assets/video/Ellerston.mp4';

const VideoPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        videoRef.current?.play();
        setIsPlaying(true);
    };

    // Pause on any click after play
    useEffect(() => {
        if (!isPlaying) return;

        const handlePauseOnClick = () => {
            if (videoRef.current) {
                videoRef.current.pause();
                setIsPlaying(false);
            }

            document.removeEventListener('click', handlePauseOnClick);
        };

        // Use setTimeout to avoid immediately pausing from the initial play click
        setTimeout(() => {
            document.addEventListener('click', handlePauseOnClick);
        }, 50);

        return () => {
            document.removeEventListener('click', handlePauseOnClick);
        };
    }, [isPlaying]);

    return (
        <section id="video_wrap" className="relative w-screen h-screen bg-black overflow-hidden">
            <video
                ref={videoRef}
                src={Ellerston}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
            />

            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent immediate pause from this click
                            handlePlay();
                        }}
                        className="text-white px-12 py-10 rounded-full text-2xl font-semibold cursor-pointer border-6 border-white"
                    >
                        ▶
                    </button>
                </div>
            )}
        </section>
    );
};

export default VideoPage;
