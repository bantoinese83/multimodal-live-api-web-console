import React, { forwardRef } from 'react';
import { Pause, Play } from 'lucide-react';

type ConnectButtonProps = {
  connected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  className?: string; // Add className to the props
};

const ConnectButton = forwardRef<HTMLButtonElement, ConnectButtonProps>(
  ({ connected, connect, disconnect, className = '' }, ref) => {
    return (
      <button
        ref={ref}
        className={`control-button control-button-connect ${connected ? '' : 'disconnected'} ${className}`}
        onClick={connected ? disconnect : connect}
      >
        {connected ? <Pause /> : <Play />}
      </button>
    );
  }
);

export default ConnectButton;