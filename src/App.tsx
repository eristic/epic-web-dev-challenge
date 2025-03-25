import MuxVideo from "@mux/mux-video-react";
import { MediaController } from "media-chrome/react";
import { useRef } from "react";
import { PlayButton } from "./player/PlayButton";
import { SeekBackwards } from "./player/SeekBackwards";
import { SeekForwards } from "./player/SeekForwards";
import { TimeDisplay } from "./player/TimeDisplay";
import './styles/animations.css';
import './app.css';
import clouds from './assets/cloud.svg';

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);


  const togglePlay = () => {
    if (videoRef.current) {
      debugger
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-200 relative">
      
      <button className="absolute top-0 left-0 border" onClick={togglePlay}>Test</button>
      
        <MediaController className="absolute inset-0 flex flex-col justify-center items-center bg-blue-200">
        <img className="clouds" src={clouds} alt="clouds" />
          <MuxVideo ref={videoRef} playbackId="C00OH5HO3jiNjENMkT1lqxoaT4hlAmQhV5JiR010101uX9g" slot="media" muted
            className="content-center w-[600px] h-[400px]"
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
