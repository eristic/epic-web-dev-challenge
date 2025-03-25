import { MediaControlBar, MediaTimeRange } from "media-chrome/react";
import { useEffect,useState } from "react";


export const ControlTree = ({videoRef}:any) => {
    const [currentImage, setCurrentImage] = useState<string>("image1.jpg");

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleTimeUpdate = () => {
            const currentTime = videoElement.currentTime;

            if (currentTime >= 0 && currentTime < 5) {
                setCurrentImage("image1.jpg");
            } else if (currentTime >= 5 && currentTime < 10) {
                setCurrentImage("image2.jpg");
            } else if (currentTime >= 10 && currentTime < 15) {
                setCurrentImage("image3.jpg");
            } else if (currentTime >= 15 && currentTime <= 20) {
                setCurrentImage("image4.jpg");
            }
        };

        videoElement.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, []);

    return (
        <div className="control-tree">
            <video ref={videoRef} src="your-video-file.mp4" controls />
            <img src={currentImage} alt="Dynamic content" />
            <MediaControlBar>
                <MediaTimeRange />
            </MediaControlBar>
        </div>
    );
};
    
