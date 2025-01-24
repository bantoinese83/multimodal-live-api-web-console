import React from 'react';
import PropTypes from 'prop-types';
import { Presentation } from 'lucide-react';

type ScreenCaptureButtonProps = {
  className?: string;
  isStreaming?: boolean;
  start: () => Promise<any>;
  stop: () => any;
};

const ScreenCaptureButton: React.FC<ScreenCaptureButtonProps> = ({ className = '', isStreaming = false, start, stop }) => {
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
      className={`control-button control-button-screen ${isStreaming ? 'streaming' : ''} ${className}`}
      onClick={handleClick}
      aria-pressed={isStreaming}
      aria-label={isStreaming ? 'Stop screen capture' : 'Start screen capture'}
    >
      <Presentation />
    </button>
  );
};

ScreenCaptureButton.propTypes = {
  className: PropTypes.string,
  isStreaming: PropTypes.bool.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
};

export default ScreenCaptureButton;