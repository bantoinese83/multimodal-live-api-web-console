import React from 'react';
import PropTypes from 'prop-types';
import { Mic, MicOff } from 'lucide-react';

type MicButtonProps = {
  className?: string;
  muted?: boolean;
  setMuted: (muted: boolean) => void;
};

const MicButton: React.FC<MicButtonProps> = ({ className = '', muted = false, setMuted }) => {
  const handleClick = () => {
    try {
      setMuted(!muted);
    } catch (error) {
      console.error('Error toggling mute state:', error);
    }
  };

  return (
    <button
      className={`control-button control-button-mic ${muted ? 'muted' : ''} ${className}`}
      onClick={handleClick}
      aria-pressed={muted}
      aria-label={muted ? 'Unmute microphone' : 'Mute microphone'}
    >
      {!muted ? <Mic /> : <MicOff />}
    </button>
  );
};

MicButton.propTypes = {
  className: PropTypes.string,
  muted: PropTypes.bool,
  setMuted: PropTypes.func.isRequired,
};

export default MicButton;