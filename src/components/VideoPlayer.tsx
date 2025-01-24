import React, { forwardRef } from "react";

type VideoPlayerProps = {
  videoRef: React.RefObject<HTMLVideoElement>;
};

const VideoPlayer: React.FC<VideoPlayerProps> = forwardRef(({ videoRef }, ref) => {
  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
      />
    </div>
  );
});

export default VideoPlayer;