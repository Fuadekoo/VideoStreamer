import React from "react";

interface VolumeControlProps {
  volume: number; // 0 to 1
  muted: boolean;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  muted,
  onVolumeChange,
  onMuteToggle,
}) => {
  return (
    <div
      className="volume-control"
      style={{ display: "flex", alignItems: "center", gap: 8 }}
    >
      <button onClick={onMuteToggle}>
        {muted || volume === 0 ? "Unmute" : "Mute"}
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={muted ? 0 : volume}
        onChange={(e) => onVolumeChange(Number(e.target.value))}
        style={{ width: 80 }}
      />
    </div>
  );
};

export default VolumeControl;
