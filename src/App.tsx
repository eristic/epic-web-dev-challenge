import MuxVideo from "@mux/mux-video-react";
import { MediaController } from "media-chrome/react";
import { PlayButton } from "./player/PlayButton";
import { SeekBackwards } from "./player/SeekBackwards";
import { SeekForwards } from "./player/SeekForwards";
import { TimeDisplay } from "./player/TimeDisplay";
import './styles/animations.css';
import './app.css';
import clouds from './assets/cloud.svg';
import bush from './assets/bush.svg';

function App() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-200 relative"> 
        <MediaController className="absolute inset-0 flex flex-col justify-center items-center bg-blue-200">
          <img className="clouds" src={clouds} alt="clouds" />
          <MuxVideo playbackId="C00OH5HO3jiNjENMkT1lqxoaT4hlAmQhV5JiR010101uX9g" slot="media" muted
            className="content-center w-[600px] h-[400px]"
          />
          <PlayButton />
          <SeekBackwards />
          <SeekForwards />
          <TimeDisplay />
          
          <div className="fixed bottom-0 w-full h-16 bg-brown-500">
            <img className="absolute left-[10%] bottom-0 w-10 h-10" src={bush} alt="plant1" />
            <img className="absolute left-[40%] bottom-0 w-20 h-20" src={bush} alt="plant2" />
            <img className="absolute left-[70%] bottom-0 w-32 h-32" src={bush} alt="plant3" />
            <img className="absolute left-[20%] bottom-0 w-48 h-48" src={bush} alt="bush1" />
            <img className="absolute left-[60%] bottom-0 w-64 h-64" src={bush} alt="bush2" />
            <img className="absolute left-[90%] bottom-0 w-16 h-16" src={bush} alt="bush2" />
          </div>

        </MediaController>
    </div>
  );
}

export default App;
