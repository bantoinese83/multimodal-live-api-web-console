import React, { createContext, FC, ReactNode } from 'react';
import { useLiveAPI, UseLiveAPIResults } from '../hooks/use-live-api';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyDmxvr6uXs_WyDnwqNiJ4QynI67vJUuj10';
const host = 'generativelanguage.googleapis.com';
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

const LiveAPIContext = createContext<UseLiveAPIResults | undefined>(undefined);

export type LiveAPIProviderProps = {
  children: ReactNode;
  url?: string;
  apiKey: string;
};

export const LiveAPIProvider: FC<LiveAPIProviderProps> = ({
                                                            url = uri,
                                                            apiKey = API_KEY,
                                                            children,
                                                          }) => {
  const liveAPI = useLiveAPI({ url, apiKey });

  return React.createElement(
    LiveAPIContext.Provider,
    { value: liveAPI },
    children,
  );
}