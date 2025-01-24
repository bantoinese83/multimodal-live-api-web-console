import React, { useRef, useState } from "react";
import { LiveAPIProvider } from "./contexts/LiveAPIContext";
import VideoControlTray from './components/control-tray/VideoControlTray';
import VideoPlayer from './components/video-player/VideoPlayer';
import Hero from './components/hero/Hero';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "";

const MainApp: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [, setVideoStream] = useState<MediaStream | null>(null);

    return (
        <div className="main-app">
            <LiveAPIProvider apiKey={API_KEY}>
                <main>
                    <Hero/>
                    <VideoPlayer videoRef={videoRef} />
                    <VideoControlTray
                        videoRef={videoRef}
                        supportsVideo={true}
                        onVideoStreamChange={setVideoStream}
                    />
                </main>
            </LiveAPIProvider>
        </div>
    );
}

export default MainApp;