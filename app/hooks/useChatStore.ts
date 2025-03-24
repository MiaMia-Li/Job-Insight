import { CoreMessage } from "ai";
import { create } from "zustand";

interface State {
  attachments:
    | { url: string; name: string; contentType: string; content: string }[]
    | null;
  base64Images: string[] | null;
  messages: CoreMessage[];
}

interface Actions {
  setBase64Images: (base64Images: string[] | null) => void;
  setAttachments: (
    updater?:
      | ((
          current:
            | {
                url: string;
                name: string;
                contentType: string;
                content: string;
              }[]
            | null
        ) =>
          | {
              url: string;
              name: string;
              contentType: string;
              content: string;
            }[]
          | null)
      | { url: string; name: string; contentType: string; content: string }[]
      | null
  ) => void;
  setMessages: (fn: (messages: CoreMessage[]) => CoreMessage[]) => void;
}

const useChatStore = create<State & Actions>()((set) => ({
  attachments: null,
  base64Images: null,
  setBase64Images: (base64Images) => set({ base64Images }),
  setAttachments: (updater) =>
    set((state) => ({
      attachments:
        typeof updater === "function"
          ? updater(state.attachments)
          : updater ?? null,
    })),
  messages: [],
  setMessages: (fn) => set((state) => ({ messages: fn(state.messages) })),
}));

export default useChatStore;
