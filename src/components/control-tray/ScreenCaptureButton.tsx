import React from 'react';
import PropTypes from 'prop-types';
import { Presentation } from 'lucide-react';

type ScreenCaptureButtonProps = {
  isStreaming?: boolean;
  start: () => Promise<any>;
  stop: () => any;
};

const ScreenCaptureButton: React.FC<ScreenCaptureButtonProps> = ({ isStreaming = false, start, stop }) => {
  const handleClick = async () => {
    try {
      if (isStreaming) {
        await stop();
      } else {
        await start();
      }
    } catch (error) {
      console.error('Error toggling screen capture stream:', error);
    }
  };

  return (
    <button
      className={`control-button control-button-screen ${isStreaming ? 'streaming' : ''}`}
      onClick={handleClick}
      aria-pressed={isStreaming}
      aria-label={isStreaming ? 'Stop screen capture' : 'Start screen capture'}
    >
      <Presentation />
    </button>
  );
};

ScreenCaptureButton.propTypes = {
  isStreaming: PropTypes.bool.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
};

export default ScreenCaptureButton;