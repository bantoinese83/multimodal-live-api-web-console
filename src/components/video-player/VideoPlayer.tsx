import React, { forwardRef } from "react";

type VideoPlayerProps = {
  videoRef: React.RefObject<HTMLVideoElement>;
  src?: string;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
  role: "interviewer" | "hiringManager";
};

const VideoPlayer: React.FC<VideoPlayerProps> = forwardRef(
  ({ videoRef, src, controls = true, muted = false, loop = false, className = "", role }, ref) => {
    return (
      <div className={`${className} ${role}`}>
        <video
          ref={videoRef}
          src={src}
          controls={controls}
          muted={muted}
          loop={loop}
          autoPlay
          playsInline
          className="custom-video-player"
        />
      </div>
    );
  }
);

export default VideoPlayer;