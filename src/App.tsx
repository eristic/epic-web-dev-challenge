import MuxPlayer from "@mux/mux-player-react";

function App() {
  return (
    <div className="w-full h-full grid grid-cols-2">
      <div>
        <p>Controls here</p>
      </div>
      <div>
      <MuxPlayer
          playbackId="C00OH5HO3jiNjENMkT1lqxoaT4hlAmQhV5JiR010101uX9g"
          accentColor="blue"
          metadata={{
            video_id: "video-id-54321",
            video_title: "Birds, birds, burds",
            viewer_user_id: "user-id-007",
          }}
        />
      </div>
    </div>
  );
}

export default App;
