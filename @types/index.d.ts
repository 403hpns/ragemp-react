export {};

declare global {
  interface Window {
    trigger: (eventName: string, args: unknown) => void;

    EventManager: {
      events: Record<string, (() => void)[]>;
      addHandler: (eventName: string, handler: (props: any) => void) => void;
      removeHandler: (eventName: string, handler: (props: any) => void) => void;
    };
  }
}
