import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MultimodalLiveAPIClientConnection,
  MultimodalLiveClient,
} from "../lib/multimodal-live-client";
import { LiveConfig } from "../multimodal-live-types";
import { AudioStreamer } from "../lib/audio-streamer";
import { audioContext } from "../lib/utils";
import VolMeterWorket from "../lib/worklets/vol-meter";

export type UseLiveAPIResults = {
  client: MultimodalLiveClient;
  setConfig: (config: LiveConfig) => void;
  config: LiveConfig;
  connected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  volume: number;
  sendInterviewData: (data: any) => void;
  sendInitialPrompt: (role: string, skillLevel: string) => void;
  sendFinalData: (data: any) => void;
};

export function useLiveAPI({
  url,
  apiKey,
}: MultimodalLiveAPIClientConnection): UseLiveAPIResults {
  const client = useMemo(
    () => new MultimodalLiveClient({ url, apiKey }),
    [url, apiKey],
  );
  const audioStreamerRef = useRef<AudioStreamer | null>(null);

  const [connected, setConnected] = useState(false);
  const [config, setConfig] = useState<LiveConfig>({
    model: "models/gemini-2.0-flash-exp",
  });
  const [volume, setVolume] = useState(0);

  // Register audio for streaming server -> speakers
  useEffect(() => {
    const initializeAudioStreamer = async () => {
      try {
        const audioCtx = await audioContext({ id: "audio-out" });
        audioStreamerRef.current = new AudioStreamer(audioCtx);
        await audioStreamerRef.current.addWorklet<any>("vumeter-out", VolMeterWorket, (ev: any) => {
          setVolume(ev.data.volume);
        });
      } catch (error) {
        console.error("Error initializing audio streamer:", error);
      }
    };

    if (!audioStreamerRef.current) {
      initializeAudioStreamer();
    }
  }, []);

  useEffect(() => {
    const onClose = () => {
      setConnected(false);
    };

    const stopAudioStreamer = () => audioStreamerRef.current?.stop();

    const onAudio = (data: ArrayBuffer) =>
      audioStreamerRef.current?.addPCM16(new Uint8Array(data));

    client
      .on("close", onClose)
      .on("interrupted", stopAudioStreamer)
      .on("audio", onAudio);

    return () => {
      client
        .off("close", onClose)
        .off("interrupted", stopAudioStreamer)
        .off("audio", onAudio);
    };
  }, [client]);

  const connect = useCallback(async () => {
    try {
      if (!config) {
        throw new Error("Config has not been set");
      }
      client.disconnect();
      await client.connect(config);
      setConnected(true);
    } catch (error) {
      console.error("Error connecting to client:", error);
    }
  }, [client, config]);

  const disconnect = useCallback(async () => {
    try {
      client.disconnect();
      setConnected(false);
    } catch (error) {
      console.error("Error disconnecting from client:", error);
    }
  }, [client]);

  const sendInterviewData = (data: any) => {
    try {
      console.log("Sending interview data to the server", data);
      // Add logic to send interview data to the server
    } catch (error) {
      console.error("Error sending interview data:", error);
    }
  };

  const sendInitialPrompt = (role: string, skillLevel: string) => {
    try {
      const initialPrompt = `Starting interview for role: ${role} with skill level: ${skillLevel}`;
      client.send([{ text: initialPrompt }]);
      console.log("Initial prompt sent");
    } catch (error) {
      console.error("Error sending initial prompt:", error);
    }
  };

  const sendFinalData = (data: any) => {
    try {
      client.send([{ text: JSON.stringify(data) }]);
      console.log("Final data sent");
    } catch (error) {
      console.error("Error sending final data:", error);
    }
  };

  return {
    client,
    config,
    setConfig,
    connected,
    connect,
    disconnect,
    volume,
    sendInterviewData,
    sendInitialPrompt,
    sendFinalData,
  };
}