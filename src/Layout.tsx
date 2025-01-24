import React, { useRef, useState } from "react";
import VideoControlTray from './components/control-tray/VideoControlTray';

const Layout: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [, setVideoStream] = useState<MediaStream | null>(null);

    return (
        <div>
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
        </div>
    );
}

export default Layout;