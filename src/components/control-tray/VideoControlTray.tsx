import React, { memo, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext";
import { useHandleStreamChange } from "../../hooks/use-handle-stream-change";
import MediaStreamButton from "./MediaStreamButton";
import AudioPulse from "../audio-pulse/AudioPulse";
import { AudioRecorder } from "../../lib/audio-recorder";
import { useWebcam } from '../../hooks/use-webcam';
import { useScreenCapture } from '../../hooks/use-screen-capture';
import { Mic, MicOff, Pause, Play, Video, VideoOff, Presentation } from 'lucide-react';

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
    <section>
      <canvas style={{ display: "none" }} ref={renderCanvasRef} />
      <nav className="toolbar">
        <button className={`control-button control-button-mic ${muted ? 'muted' : ''}`} onClick={() => setMuted(!muted)}>
          {!muted ? (
            <Mic />
          ) : (
            <MicOff />
          )}
        </button>

        <AudioPulse volume={volume} active={connected} hover={false} />

        {supportsVideo && (
          <>
            <MediaStreamButton
              isStreaming={screenCapture.isStreaming}
              start={handleStreamChange(screenCapture)}
              stop={handleStreamChange()}
              onIcon={<Presentation />}
              offIcon={<Presentation />}
            />
            <MediaStreamButton
              isStreaming={webcam.isStreaming}
              start={handleStreamChange(webcam)}
              stop={handleStreamChange()}
              onIcon={<VideoOff />}
              offIcon={<Video />}
            />
          </>
        )}
        {children}
        <button className={`control-button control-button-connect ${connected ? '' : 'disconnected'}`} ref={connectButtonRef} onClick={connected ? disconnect : connect}>
          <span>
            {connected ? <Pause /> : <Play />}
          </span>
        </button>
    <span className="streaming-status">Streaming</span>
      </nav>
    </section>
  );
}

export default memo(VideoControlTray);