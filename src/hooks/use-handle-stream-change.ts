import { UseMediaStreamResult } from "./use-media-stream-mux";

export const useHandleStreamChange = (
  videoStreams: UseMediaStreamResult[],
  setActiveVideoStream: (stream: MediaStream | null) => void,
  onVideoStreamChange: (stream: MediaStream | null) => void
) => {
  return (next?: UseMediaStreamResult) => async () => {
    try {
      // Stop all current streams first
      videoStreams.forEach((msr) => msr.stop());

      if (next) {
        const mediaStream = await next.start();
        setActiveVideoStream(mediaStream);
        onVideoStreamChange(mediaStream);
      } else {
        setActiveVideoStream(null);
        onVideoStreamChange(null);
      }
    } catch (error) {
      console.error("Error changing streams:", error);
      setActiveVideoStream(null);
      onVideoStreamChange(null);
    }
  };
};