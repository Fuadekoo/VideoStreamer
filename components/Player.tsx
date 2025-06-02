// Main video player UI
// src/components/Player.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import Controls from "./Controls";
import Playlist from "./Playlist";
import { VideoItem } from "../types";
// import "../styles/player.css";

interface PlayerProps {
  src: string;
  playlist?: VideoItem[];
  title?: string;
}

export default function Player({ src, playlist = [], title }: PlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const currentSrc =
    playlist.length > 0 ? playlist[currentVideoIndex]?.url : src;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentSrc]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime += seconds;
  };

  const changeSpeed = () => {
    const video = videoRef.current;
    if (!video) return;
    const newSpeed = speed === 2 ? 1 : speed + 0.5;
    video.playbackRate = newSpeed;
    setSpeed(newSpeed);
  };

  const handleNext = () => {
    if (playlist.length > 0 && currentVideoIndex < playlist.length - 1) {
      setCurrentVideoIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (playlist.length > 0 && currentVideoIndex > 0) {
      setCurrentVideoIndex((i) => i - 1);
    }
  };

  return (
    <div className="video-player">
      <h2>{title}</h2>
      <video ref={videoRef} src={currentSrc} controls width="100%" />
      <Controls
        playing={playing}
        onPlayPause={togglePlay}
        onSkip={(sec) => skipTime(sec)}
        onSpeedChange={changeSpeed}
        speed={speed}
      />
      {playlist.length > 0 && (
        <Playlist
          videos={playlist}
          currentIndex={currentVideoIndex}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
}
