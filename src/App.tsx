import MuxVideo from "@mux/mux-video-react";
import { MediaController } from "media-chrome/react";
import { useRef } from "react";
import { PlayButton } from "./player/PlayButton";
import { SeekBackwards } from "./player/SeekBackwards";
import { SeekForwards } from "./player/SeekForwards";
import { TimeDisplay } from "./player/TimeDisplay";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);


  const togglePlay = () => {
    if (videoRef.current) {
      debugger
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-200">
      <button className="absolute top-0 left-0 border" onClick={togglePlay}>Test</button>
      
        <MediaController className="relative w-full h-screen bg-blue-200">
          <MuxVideo ref={videoRef} playbackId="C00OH5HO3jiNjENMkT1lqxoaT4hlAmQhV5JiR010101uX9g" slot="media" muted
            className="self-center w-64 h-32"
          />
          <PlayButton />
          <SeekBackwards />
          <SeekForwards />
          <TimeDisplay />
        </MediaController>
    </div>
  );
}

export default App;
