import React, { useRef, useEffect } from 'react';

interface LogoProps {
    width?: number;
    height?: number;
    loopDelay?: number;
    className?: string;
    stopLoop?: boolean;
    playbackRate?: number;
}

const Logo: React.FC<LogoProps> = ({ loopDelay = 0, className, stopLoop = true, playbackRate = 1.0 }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.playbackRate = playbackRate;
            
            // Reset and play the video when stopLoop changes
            if (!stopLoop) {
                videoElement.currentTime = 0;
                videoElement.play();
            }
        }
    }, [playbackRate, stopLoop]);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement && !stopLoop) {
            const handleEnded = () => {
                setTimeout(() => {
                    videoElement.play();
                }, loopDelay);
            };

            videoElement.addEventListener('ended', handleEnded);
            return () => {
                videoElement.removeEventListener('ended', handleEnded);
            };
        }
    }, [loopDelay, stopLoop]);

    return (
        <div 
            className={className}
            style={{ 
                margin: '0 auto',
                display: 'block'
            }}
        >
            <video 
                ref={videoRef}
                style={{ 
                    width: '100%', 
                    height: 'auto',
                    display: 'block',
                    margin: '0 auto'
                }}
                playsInline
                muted
                autoPlay
                loop={!stopLoop}
                onTimeUpdate={() => {
                    const videoElement = videoRef.current;
                    if (videoElement && !stopLoop && videoElement.currentTime >= 2.6) {
                        videoElement.currentTime = 0;
                        videoElement.play();
                    }
                }}
            >
                <source 
                    src="https://stream.mux.com/YLk8X01PMRxTB6xO6el9FchZeiB8sYEddk9bON8fVxBg/capped-1080p.mp4" 
                    type="video/mp4" 
                />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default Logo;