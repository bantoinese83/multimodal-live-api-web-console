import React, { useRef, useState } from "react";
import { LiveAPIProvider } from "./contexts/LiveAPIContext";
import VideoControlTray from './components/control-tray/VideoControlTray';
import VideoPlayer from './components/video-player/VideoPlayer';
import Hero from './components/hero/Hero';
import Header from './components/header/Header';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "";

const MainApp: React.FC = () => {
    const interviewerVideoRef = useRef<HTMLVideoElement>(null);
    const hiringManagerVideoRef = useRef<HTMLVideoElement>(null);
    const [, setVideoStream] = useState<MediaStream | null>(null);

    return (
        <div className="main-app">
            <LiveAPIProvider apiKey={API_KEY}>
                <Header/>
                <Hero/>
                <div className="video-players-container">
                    <VideoPlayer videoRef={interviewerVideoRef} role="interviewer" />
                    <VideoPlayer videoRef={hiringManagerVideoRef} role="hiringManager" />
                </div>
                <VideoControlTray
                    videoRef={interviewerVideoRef}
                    supportsVideo={true}
                    onVideoStreamChange={setVideoStream}
                />
            </LiveAPIProvider>
        </div>
    );
}

export default MainApp;