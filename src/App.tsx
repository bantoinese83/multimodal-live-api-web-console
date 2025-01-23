import {useRef, useState, useEffect} from "react";
import "./App.scss";
import {LiveAPIProvider} from "./contexts/LiveAPIContext";
import SidePanel from "./components/side-panel/SidePanel";
import {Altair} from "./components/altair/Altair";
import ControlTray from "./components/control-tray/ControlTray";
import cn from "classnames";
import { useLoggerStore } from "./lib/store-logger";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "AIzaSyDmxvr6uXs_WyDnwqNiJ4QynI67vJUuj10";


const host = "generativelanguage.googleapis.com";
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

function App() {
    // this video reference is used for displaying the active stream, whether that is the webcam or screen capture
    // feel free to style as you see fit
    const videoRef = useRef<HTMLVideoElement>(null);
    // either the screen capture, the video or null, if null we hide it
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

    // New state for role and skill level
    const [role, setRole] = useState("");
    const [skillLevel, setSkillLevel] = useState("");

    // State for transcript
    const [transcript, setTranscript] = useState<string[]>([]);
    const { logs } = useLoggerStore();

    useEffect(() => {
        const newLogs = logs.map(log => log.message as string);
        setTranscript(newLogs);
    }, [logs]);

    return (
        <div className="App">
            <LiveAPIProvider url={uri} apiKey={API_KEY}>
                <div className="streaming-console">
                    <SidePanel transcript={transcript}/>
                    <main>
                        <div className="main-app-area">
                            {/* APP goes here */}
                            <Altair/>
                            <video
                                className={cn("stream", {
                                    hidden: !videoRef.current || !videoStream,
                                })}
                                ref={videoRef}
                                autoPlay
                                playsInline
                            />
                        </div>

                        <ControlTray
                            videoRef={videoRef}
                            supportsVideo={true}
                            onVideoStreamChange={setVideoStream}
                        >
                            {/* put your own buttons here */}
                        </ControlTray>

                        {/* Input fields for role and skill level */}
                        <div className="input-fields">
                            <label>
                                Role:
                                <input
                                    type="text"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                            </label>
                            <label>
                                Skill Level:
                                <input
                                    type="text"
                                    value={skillLevel}
                                    onChange={(e) => setSkillLevel(e.target.value)}
                                />
                            </label>
                        </div>
                    </main>
                </div>
            </LiveAPIProvider>
        </div>
    );
}

export default App;
