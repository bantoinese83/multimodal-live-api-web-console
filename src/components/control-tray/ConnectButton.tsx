import React, { forwardRef } from 'react';
import { Pause, Play } from 'lucide-react';

type ConnectButtonProps = {
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
};

const ConnectButton = forwardRef<HTMLButtonElement, ConnectButtonProps>(
  ({ connected, connect, disconnect }, ref) => {
    return (
      <button
        ref={ref}
        className={`control-button control-button-connect ${connected ? '' : 'disconnected'}`}
        onClick={connected ? disconnect : connect}
      >
        {connected ? <Pause /> : <Play />}
      </button>
    );
  }
);

export default ConnectButton;