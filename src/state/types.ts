export type VoiceMode = "idle" | "listening" | "transcribing" | "review" | "sent" | "error";

export type LanguageHint = "auto" | "hindi" | "hinglish" | "english";

export interface Segment {
  id: string;
  text: string;
  confidence: "high" | "low";
  alternatives?: string[];
  corrected?: boolean;
  groupId?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  attachment?: { name: string; meta: string };
}

export interface VoiceFlowState {
  mode: VoiceMode;
  languageHint: LanguageHint;
  segments: Segment[];
  activeSuggestionGroupId?: string;
  isEditing: boolean;
  editDraft: string;
  fallbackReason?: string;
  messages: ChatMessage[];
  scriptIndex: number;
}

export type VoiceFlowAction =
  | { type: "SET_LANGUAGE"; hint: LanguageHint }
  | { type: "START_LISTENING"; scriptIndex: number }
  | { type: "PUSH_SEGMENT"; segment: Segment }
  | { type: "STOP_RECORDING" }
  | { type: "OPEN_SUGGESTION"; groupId: string }
  | { type: "CLOSE_SUGGESTION" }
  | { type: "SELECT_SUGGESTION"; groupId: string; value: string }
  | { type: "CLEAR_CORRECTED"; segmentId: string }
  | { type: "START_EDIT" }
  | { type: "SET_EDIT_DRAFT"; value: string }
  | { type: "FINISH_EDIT" }
  | { type: "SEND" }
  | { type: "SEND_TEXT"; text: string }
  | { type: "APPEND_RESPONSE"; messages: ChatMessage[] }
  | { type: "GOTO_ERROR"; reason: string }
  | { type: "GOTO_ERROR_EDIT" }
  | { type: "RESET" }
  | { type: "DEMO_SET"; patch: Partial<VoiceFlowState> };
