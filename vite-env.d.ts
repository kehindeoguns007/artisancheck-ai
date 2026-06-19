/// <reference types="vite/client" />

novus/instrument-pendo-track-events
declare const pendo: {
  track(eventName: string, properties?: Record<string, unknown>): void;
};

declare var pendo: any;
 main
