import React from "react";
import { LiveAPIProvider } from "./contexts/LiveAPIContext";
import Layout from './Layout';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "";

const MainApp: React.FC = () => {
    return (
        <div className="main-app">
            <LiveAPIProvider apiKey={API_KEY}>
                <Layout />
            </LiveAPIProvider>
        </div>
    );
}

export default MainApp;