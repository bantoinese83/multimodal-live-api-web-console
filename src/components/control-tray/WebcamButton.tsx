import React from 'react';
import { Video, VideoOff } from 'lucide-react';

type WebcamButtonProps = {
  isStreaming: boolean;
  start: () => Promise<any>;
  stop: () => any;
};

const WebcamButton: React.FC<WebcamButtonProps> = ({ isStreaming, start, stop }) => {
  return (
    <button
      className={`control-button control-button-webcam ${isStreaming ? 'streaming' : ''}`}
      onClick={isStreaming ? stop : start}
    >
      {isStreaming ? <VideoOff /> : <Video />}
    </button>
  );
};

export default WebcamButton;
