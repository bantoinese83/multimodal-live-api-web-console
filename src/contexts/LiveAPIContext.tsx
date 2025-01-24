import { createContext, FC, ReactNode, useContext, useMemo } from "react";
import { useLiveAPI, UseLiveAPIResults } from "../hooks/use-live-api";

const LiveAPIContext = createContext<UseLiveAPIResults | undefined>(undefined);

export type LiveAPIProviderProps = {
  children: ReactNode;
  url?: string;
  apiKey: string;
};

export const LiveAPIProvider: FC<LiveAPIProviderProps> = ({
  url = "",
  apiKey,
  children,
}) => {
  if (!apiKey) {
    throw new Error("API key is required for LiveAPIProvider");
  }

  const liveAPI = useLiveAPI({ url, apiKey });

  const contextValue = useMemo(() => liveAPI, [liveAPI]);

  return (
    <LiveAPIContext.Provider value={contextValue}>
      {children}
    </LiveAPIContext.Provider>
  );
};

export const useLiveAPIContext = (): UseLiveAPIResults => {
  const context = useContext(LiveAPIContext);
  if (!context) {
    throw new Error("useLiveAPIContext must be used within a LiveAPIProvider");
  }
  return context;
};