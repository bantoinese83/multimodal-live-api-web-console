import { useEffect, useState } from 'react';
import { UseMediaStreamResult } from './use-media-stream-mux';

export function useWebcam(): UseMediaStreamResult {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    const handleStreamEnded = () => {
      setIsStreaming(false);
      setStream(null);
    };

    if (stream) {
      stream.getTracks().forEach((track) => track.addEventListener("ended", handleStreamEnded));
      return () => {
        stream.getTracks().forEach((track) => track.removeEventListener("ended", handleStreamEnded));
      };
    }
  }, [stream]);

  const start = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      setIsStreaming(true);
      return mediaStream;
    } catch (error) {
      console.error("Error starting webcam:", error);
      setIsStreaming(false);
      throw error;
    }
  };

  const stop = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsStreaming(false);
    }
  };

  return {
    type: "webcam",
    start,
    stop,
    isStreaming,
    stream,
  };
}