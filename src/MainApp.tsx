import React, { useRef, useState } from "react";
import { LiveAPIProvider } from "./contexts/LiveAPIContext";
import VideoControlTray from './components/control-tray/VideoControlTray';
import VideoPlayer from './components/video-player/VideoPlayer';
import Hero from './components/hero/Hero';
import Header from './components/header/Header';
import OnboardingForm from './components/onboarding/OnboardingForm';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "";

const MainApp: React.FC = () => {
    const interviewerVideoRef = useRef<HTMLVideoElement>(null);
    const hiringManagerVideoRef = useRef<HTMLVideoElement>(null);
    const [, setVideoStream] = useState<MediaStream | null>(null);
    const [role, setRole] = useState<string>('');
    const [skillLevel, setSkillLevel] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean>(false);

    const handleOnboardingSubmit = (role: string, skillLevel: string, name: string) => {
        setRole(role);
        setSkillLevel(skillLevel);
        setName(name);
        setIsOnboardingComplete(true);
    };

    return (
        <div className="main-app">
            <LiveAPIProvider apiKey={API_KEY}>
                <Header />
                <Hero />
                {!isOnboardingComplete ? (
                    <OnboardingForm onSubmit={handleOnboardingSubmit} />
                ) : (
                    <>
                        <div className="video-players-container">
                            <VideoPlayer videoRef={interviewerVideoRef} role="interviewer" />
                            <VideoPlayer videoRef={hiringManagerVideoRef} role="hiringManager" />
                        </div>
                        <VideoControlTray
                            videoRef={interviewerVideoRef}
                            supportsVideo={true}
                            onVideoStreamChange={setVideoStream}
                            role={role}
                            skillLevel={skillLevel}
                            name={name}
                        />
                    </>
                )}
            </LiveAPIProvider>
        </div>
    );
}

export default MainApp;