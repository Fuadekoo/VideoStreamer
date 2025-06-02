// Play, pause, skip, speed;

import React from "react";

interface ControlsProps {
  playing: boolean;
  onPlayPause: () => void;
  onSkip: (seconds: number) => void;
  onSpeedChange: () => void;
  speed: number;
}

export default function Controls({
  playing,
  onPlayPause,
  onSkip,
  onSpeedChange,
  speed,
}: ControlsProps) {
  return (
    <div className="controls">
      <button onClick={() => onSkip(-300)}>⏪ 5 min</button>
      <button onClick={onPlayPause}>{playing ? "Pause" : "Play"}</button>
      <button onClick={() => onSkip(300)}>5 min ⏩</button>
      <button onClick={onSpeedChange}>Speed: {speed}x </button>
    </div>
  );
}
