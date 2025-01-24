import React, { useRef, useState } from "react";
import { LiveAPIProvider } from "./contexts/LiveAPIContext";
import VideoControlTray from './components/control-tray/VideoControlTray';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "";

const MainApp: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [, setVideoStream] = useState<MediaStream | null>(null);

    return (
        <div className="main-app">
            <LiveAPIProvider apiKey={API_KEY}>
                <main>
                    <div>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                        />
                    </div>
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