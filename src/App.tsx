import MuxVideo from "@mux/mux-video-react";
import { MediaController, MediaPlayButton, MediaSeekBackwardButton, MediaSeekForwardButton, MediaTimeDisplay } from "media-chrome/react";

function App() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
        <MediaController>
          <MuxVideo playbackId="C00OH5HO3jiNjENMkT1lqxoaT4hlAmQhV5JiR010101uX9g" slot="media" muted />
          
          <MediaPlayButton />
          <MediaSeekBackwardButton />
          <MediaSeekForwardButton />
          <MediaTimeDisplay />
        </MediaController>
    </div>
  );
}

export default App;
