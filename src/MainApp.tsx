import React, { useRef, useState } from "react";
import { LiveAPIProvider } from "./contexts/LiveAPIContext";
import VideoControlTray from "./components/control-tray/VideoControlTray";
import cn from "classnames";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "";

const MainApp: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

    return (
        <div className="MainApp h-screen w-screen flex flex-col">
            <LiveAPIProvider apiKey={API_KEY}>
                <div className="streaming-console flex flex-col h-full w-full bg-neutral-900 text-gray-300">
                    <main className="flex flex-col items-center justify-center flex-grow gap-4 max-w-full overflow-hidden relative">
                        <div className="main-app-area flex flex-1 items-center justify-center">
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
