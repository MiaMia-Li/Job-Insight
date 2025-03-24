import { createAI } from "ai/rsc";
import {
  ServerMessage,
  ClientMessage,
  continueConversation,
} from "../actions/resume-action";

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation,
  },
  initialAIState: [],
  initialUIState: [],
});
