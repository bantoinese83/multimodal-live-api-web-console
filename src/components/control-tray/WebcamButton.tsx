import React from 'react';
import PropTypes from 'prop-types';
import { Video, VideoOff } from 'lucide-react';

type WebcamButtonProps = {
  className?: string;
  isStreaming: boolean;
  start: () => Promise<any>;
  stop: () => any;
};

const WebcamButton: React.FC<WebcamButtonProps> = ({ className = '', isStreaming = false, start, stop }) => {
  const handleClick = async () => {
    try {
      if (isStreaming) {
        await stop();
      } else {
        await start();
      }
    } catch (error) {
      console.error('Error toggling webcam stream:', error);
    }
  };

  return (
    <button
      className={`control-button control-button-webcam ${isStreaming ? 'streaming' : ''} ${className}`}
      onClick={handleClick}
      aria-pressed={isStreaming}
      aria-label={isStreaming ? 'Stop webcam' : 'Start webcam'}
    >
      {isStreaming ? <VideoOff /> : <Video />}
    </button>
  );
};

WebcamButton.propTypes = {
  className: PropTypes.string,
  isStreaming: PropTypes.bool.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
};

export default WebcamButton;