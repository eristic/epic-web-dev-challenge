import MuxPlayer from "@mux/mux-player-react";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <MuxPlayer
        playbackId="C00OH5HO3jiNjENMkT1lqxoaT4hlAmQhV5JiR010101uX9g"
        metadata={{
          video_id: "video-id-54321",
          video_title: "Birds, birds, burds",
          viewer_user_id: "user-id-007",
        }}
      />
    </div>
  );
}

export default App;
