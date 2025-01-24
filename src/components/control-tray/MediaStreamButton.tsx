// src/components/control-tray/MediaStreamButton.tsx
import React, { memo, ReactNode } from "react";

type MediaStreamButtonProps = {
  isStreaming: boolean;
  onIcon: ReactNode;
  offIcon: ReactNode;
  start: () => Promise<any>;
  stop: () => any;
};

const MediaStreamButton: React.FC<MediaStreamButtonProps> = memo(
  ({ isStreaming, onIcon, offIcon, start, stop }) =>
    isStreaming ? (
      <button className="media-stream-button" onClick={stop}>
        {onIcon}
      </button>
    ) : (
      <button className="media-stream-button" onClick={start}>
        {offIcon}
      </button>
    ),
);

export default MediaStreamButton;