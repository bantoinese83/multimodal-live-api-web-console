import React, { memo } from "react";

type MediaStreamButtonProps = {
  isStreaming: boolean;
  onIcon: string;
  offIcon: string;
  start: () => Promise<any>;
  stop: () => any;
};

const MediaStreamButton: React.FC<MediaStreamButtonProps> = memo(
  ({ isStreaming, onIcon, offIcon, start, stop }) =>
    isStreaming ? (
      <button className="control-button-streaming" onClick={stop}>
        <span className="material-symbols-outlined">{onIcon}</span>
      </button>
    ) : (
      <button className="control-button-streaming" onClick={start}>
        <span className="material-symbols-outlined">{offIcon}</span>
      </button>
    ),
);

export default MediaStreamButton;