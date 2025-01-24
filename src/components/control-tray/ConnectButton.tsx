import React from 'react';
import { Pause, Play } from 'lucide-react';

type ConnectButtonProps = {
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
};

const ConnectButton: React.FC<ConnectButtonProps> = ({ connected, connect, disconnect }) => {
  return (
    <button
      className={`control-button control-button-connect ${connected ? '' : 'disconnected'}`}
      onClick={connected ? disconnect : connect}
    >
      {connected ? <Pause /> : <Play />}
    </button>
  );
};

export default ConnectButton;
