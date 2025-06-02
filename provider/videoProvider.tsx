"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { VideoItem } from "../types";

interface VideoContextProps {
  playlist: VideoItem[];
  currentIndex: number;
  setPlaylist: (videos: VideoItem[]) => void;
  setCurrentIndex: (index: number) => void;
}

const VideoContext = createContext<VideoContextProps | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [playlist, setPlaylist] = useState<VideoItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <VideoContext.Provider
      value={{ playlist, currentIndex, setPlaylist, setCurrentIndex }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export function useVideoContext() {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
}
