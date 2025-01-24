import cn from "classnames";
import React, { memo, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext";
import { useHandleStreamChange } from "../../hooks/use-handle-stream-change";
import MediaStreamButton from "./MediaStreamButton";
import AudioPulse from "../audio-pulse/AudioPulse";
import { AudioRecorder } from "../../lib/audio-recorder";
import { useWebcam } from '../../hooks/use-webcam';
import { useScreenCapture } from '../../hooks/use-screen-capture';

export type VideoControlTrayProps = {
  videoRef: RefObject<HTMLVideoElement>;
  children?: ReactNode;
  supportsVideo: boolean;
  onVideoStreamChange?: (stream: MediaStream | null) => void;
};

const VideoControlTray: React.FC<VideoControlTrayProps> = ({
  videoRef,
  children,
  onVideoStreamChange = () => {},
  supportsVideo,
}) => {
  const videoStreams = [useWebcam(), useScreenCapture()];
  const [activeVideoStream, setActiveVideoStream] = useState<MediaStream | null>(null);
  const [webcam, screenCapture] = videoStreams;
  const [inVolume, setInVolume] = useState(0);
  const [audioRecorder] = useState(() => new AudioRecorder());
  const [muted, setMuted] = useState(false);
  const renderCanvasRef = useRef<HTMLCanvasElement>(null);
  const connectButtonRef = useRef<HTMLButtonElement>(null);

  const { client, connected, connect, disconnect, volume } = useLiveAPIContext();
  const handleStreamChange = useHandleStreamChange(videoStreams, setActiveVideoStream, onVideoStreamChange);

  useEffect(() => {
    if (!connected && connectButtonRef.current) {
      connectButtonRef.current.focus();
    }
  }, [connected]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--volume",
      `${Math.max(5, Math.min(inVolume * 200, 8))}px`,
    );
  }, [inVolume]);

  useEffect(() => {
    const onData = (base64: string) => {
      client.sendRealtimeInput([
        {
          mimeType: "audio/pcm;rate=16000",
          data: base64,
        },
      ]);
    };

    if (connected && !muted && audioRecorder) {
      audioRecorder.on("data", onData).on("volume", setInVolume).start().catch(console.error);
    } else {
      audioRecorder.stop();
    }

    return () => {
      audioRecorder.off("data", onData).off("volume", setInVolume);
    };
  }, [connected, client, muted, audioRecorder]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = activeVideoStream;
    }

    let timeoutId: number | null = null;

    const sendVideoFrame = () => {
      const video = videoRef.current;
      const canvas = renderCanvasRef.current;

      if (!video || !canvas) {
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }

      canvas.width = video.videoWidth * 0.25;
      canvas.height = video.videoHeight * 0.25;
      if (canvas.width + canvas.height > 0) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL("image/jpeg", 1.0);
        const data = base64.slice(base64.indexOf(",") + 1);
        client.sendRealtimeInput([{ mimeType: "image/jpeg", data }]);
      }

      if (connected) {
        timeoutId = window.setTimeout(sendVideoFrame, 1000 / 0.5);
      }
    };

    if (connected && activeVideoStream !== null) {
      requestAnimationFrame(sendVideoFrame);
    }

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [connected, activeVideoStream, client, videoRef]);

  return (
    <section className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center items-start gap-2 pb-4">
      <canvas style={{ display: "none" }} ref={renderCanvasRef} />
      <nav className={cn("bg-neutral-900 border border-neutral-700 rounded-lg flex gap-3 items-center overflow-hidden p-2 transition-all duration-500", { "opacity-50": !connected })}>
        <button
          className={cn("control-button-mic", { "bg-red-500": !muted, "bg-gray-500": muted })}
          onClick={() => setMuted(!muted)}
        >
          {!muted ? (
            <span className="material-symbols-outlined filled">mic</span>
          ) : (
            <span className="material-symbols-outlined filled">mic_off</span>
          )}
        </button>

        <div className="control-button-audio-pulse">
          <AudioPulse volume={volume} active={connected} hover={false} />
        </div>

        {supportsVideo && (
          <>
            <MediaStreamButton
              isStreaming={screenCapture.isStreaming}
              start={handleStreamChange(screenCapture)}
              stop={handleStreamChange()}
              onIcon="cancel_presentation"
              offIcon="present_to_all"
            />
            <MediaStreamButton
              isStreaming={webcam.isStreaming}
              start={handleStreamChange(webcam)}
              stop={handleStreamChange()}
              onIcon="videocam_off"
              offIcon="videocam"
            />
          </>
        )}
        {children}
        <div className={cn("flex flex-col justify-center items-center gap-1", { "opacity-100": connected, "opacity-50": !connected })}>
          <div className="control-button-connection">
            <button
              ref={connectButtonRef}
              className={cn("control-button-connect", { "bg-green-500": connected, "bg-gray-500": !connected })}
              onClick={connected ? disconnect : connect}
            >
              <span className="material-symbols-outlined filled">
                {connected ? "pause" : "play_arrow"}
              </span>
            </button>
          </div>
          <span className="text-xs text-blue-500 select-none">Streaming</span>
        </div>
      </nav>
    </section>
  );
}

export default memo(VideoControlTray);