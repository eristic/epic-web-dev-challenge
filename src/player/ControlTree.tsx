import { useEffect,useState } from "react";
import tree from '../assets/tree.svg';

export const ControlTree = ({videoRef}:any) => {
    const [height, setHeight] = useState<number>(25);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleTimeUpdate = () => {
            const currentTime = videoElement.currentTime;
            setHeight((currentTime / 23) * 100);
        };

        videoElement.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, []);

    return (
        <div className="relative left-[25%] bottom-[0px] h-screen w-screen z-100">
            <div className="absolute" style={{
                bottom: `${(height)}%`,
                transform: 'rotate(0deg)',
                position: 'relative',
                backgroundImage: `url(${tree})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom',
                height: `${height}%`,
                maxWidth: '100%',
            }}
            />
        </div>
    );
};
    
