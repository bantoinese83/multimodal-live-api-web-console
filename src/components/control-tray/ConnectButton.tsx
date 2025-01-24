import React, { forwardRef } from 'react';
import { Pause, Play } from 'lucide-react';
import { useLiveAPIContext } from '../../contexts/LiveAPIContext';

type ConnectButtonProps = {
  connected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  className?: string; // Add className to the props
  role: string;
  skillLevel: string;
};

const ConnectButton = forwardRef<HTMLButtonElement, ConnectButtonProps>(
  ({ connected, connect, disconnect, className = '', role, skillLevel }, ref) => {
    const { sendInitialPrompt } = useLiveAPIContext();

    const handleConnect = async () => {
      await connect();
      // Call sendInitialPrompt with role and skillLevel
      sendInitialPrompt(role, skillLevel);
    };

    return (
      <button
        ref={ref}
        className={`control-button control-button-connect ${connected ? '' : 'disconnected'} ${className}`}
        onClick={connected ? disconnect : handleConnect}
      >
        {connected ? <Pause /> : <Play />}
      </button>
    );
  }
);

export default ConnectButton;
