import React from 'react';
import { Presentation } from 'lucide-react';

type ScreenCaptureButtonProps = {
  isStreaming: boolean;
  start: () => Promise<any>;
  stop: () => any;
};

const ScreenCaptureButton: React.FC<ScreenCaptureButtonProps> = ({ isStreaming, start, stop }) => {
  return (
    <button
      className={`control-button control-button-screen ${isStreaming ? 'streaming' : ''}`}
      onClick={isStreaming ? stop : start}
    >
      <Presentation />
    </button>
  );
};

export default ScreenCaptureButton;
