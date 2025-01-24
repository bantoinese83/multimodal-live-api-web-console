import { UseMediaStreamResult } from "./use-media-stream-mux";

export const useHandleStreamChange = (
  videoStreams: UseMediaStreamResult[],
  setActiveVideoStream: (stream: MediaStream | null) => void,
  onVideoStreamChange: (stream: MediaStream | null) => void
) => {
  return (next?: UseMediaStreamResult) => async () => {
    try {
      if (next) {
        const mediaStream = await next.start();
        setActiveVideoStream(mediaStream);
        onVideoStreamChange(mediaStream);
      } else {
        setActiveVideoStream(null);
        onVideoStreamChange(null);
      }

      videoStreams.filter((msr) => msr !== next).forEach((msr) => msr.stop());
    } catch (error) {
      console.error("Error changing streams:", error);
    }
  };
};