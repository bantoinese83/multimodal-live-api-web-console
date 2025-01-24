import React from 'react';
import { Mic, MicOff } from 'lucide-react';

type MicButtonProps = {
  muted: boolean;
  setMuted: (muted: boolean) => void;
};

const MicButton: React.FC<MicButtonProps> = ({ muted, setMuted }) => {
  return (
    <button
      className={`control-button control-button-mic ${muted ? 'muted' : ''}`}
      onClick={() => setMuted(!muted)}
    >
      {!muted ? <Mic /> : <MicOff />}
    </button>
  );
};

export default MicButton;
