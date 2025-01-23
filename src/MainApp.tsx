import React, { useRef, useState } from "react";
import "./App.scss";
import { LiveAPIProvider } from "./api/LiveAPI";
import VideoControlTray from "./components/control-tray/VideoControlTray";
import cn from "classnames";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "";

const MainApp: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

    return (
        <div className="MainApp">
            <LiveAPIProvider apiKey={API_KEY}>
                <div className="streaming-console">
                    <main>
                        <div className="main-app-area">
                            <video
                                className={cn("stream", {
                                    hidden: !videoRef.current || !videoStream,
                                })}
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
                </div>
            </LiveAPIProvider>
        </div>
    );
}

export default MainApp;