import { useEffect, useState } from 'react';
import { UseMediaStreamResult } from './use-media-stream-mux';

export function useScreenCapture(): UseMediaStreamResult {
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
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      setStream(mediaStream);
      setIsStreaming(true);
      return mediaStream;
    } catch (error) {
      console.error("Error starting screen capture:", error);
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
    type: "screen",
    start,
    stop,
    isStreaming,
    stream,
  };
}