import type { ChatMessage, Segment, VoiceFlowState } from "./types";

export const GENERIC_REPLY = "Got it! Tell me a bit more about what you need and I'll help.";

export const TIMING = {
  wordIntervalMs: 190,
  listeningHoldMs: 900,
  earlyStopThresholdMs: 800,
  typingIndicatorMs: 650,
  correctionHighlightMs: 900,
};

export interface DemoScript {
  segments: Segment[];
  response: ChatMessage[];
}

function seg(id: string, text: string, confidence: "high" | "low" = "high", extra: Partial<Segment> = {}): Segment {
  return { id, text, confidence, ...extra };
}

export const PRIMARY_SCRIPT: DemoScript = {
  segments: [
    seg("p1", "mujhe"),
    seg("p2", "ek"),
    seg("p3", "marketing"),
    seg("p4", "intern", "low", {
      groupId: "internship",
      alternatives: ["internship", "intern ship", "internetship"],
    }),
    seg("p5", "ship", "low", {
      groupId: "internship",
      alternatives: ["internship", "intern ship", "internetship"],
    }),
    seg("p6", "ke"),
    seg("p7", "liye"),
    seg("p8", "resume"),
    seg("p9", "banana"),
    seg("p10", "hai"),
    seg("p11", "jo"),
    seg("p12", "simple"),
    seg("p13", "aur"),
    seg("p14", "professional"),
    seg("p15", "ho"),
  ],
  response: [
    {
      id: "r1",
      role: "assistant",
      text: "Sure! Here's a simple and professional resume format for a marketing internship.",
    },
    {
      id: "r2",
      role: "assistant",
      text: "",
      attachment: { name: "Marketing_Resume_Template.pdf", meta: "PDF · 98 KB" },
    },
    {
      id: "r3",
      role: "assistant",
      text: "You can customize it with your details and experience. Let me know if you'd like help personalizing it!",
    },
  ],
};

export const SECONDARY_SCRIPT: DemoScript = {
  segments: [
    seg("s1", "kal"),
    seg("s2", "mujhe"),
    seg("s3", "placement"),
    seg("s4", "interview"),
    seg("s5", "ke"),
    seg("s6", "liye"),
    seg("s7", "kuch"),
    seg("s8", "common"),
    seg("s9", "aich", "low", {
      groupId: "hr",
      alternatives: ["HR", "aich aar", "argh"],
    }),
    seg("s10", "aar", "low", {
      groupId: "hr",
      alternatives: ["HR", "aich aar", "argh"],
    }),
    seg("s11", "questions"),
    seg("s12", "practice"),
    seg("s13", "karne"),
    seg("s14", "hain"),
  ],
  response: [
    {
      id: "r4",
      role: "assistant",
      text: "Here are a few common HR questions to practice for your placement interview: “Tell me about yourself,” “Why this company?” and “Where do you see yourself in 5 years?”",
    },
  ],
};

/** Direct-jump snapshots for the walkthrough nav, so every screen is reachable without waiting out the mock timers. */
export function demoSnapshot(step: number): Partial<VoiceFlowState> {
  const base = {
    isEditing: false,
    activeSuggestionGroupId: undefined,
    fallbackReason: undefined,
    scriptIndex: 0,
  };

  switch (step) {
    case 1:
      return { ...base, mode: "idle", segments: [], messages: [] };
    case 2:
      return { ...base, mode: "listening", segments: [] };
    case 3:
      return { ...base, mode: "transcribing", segments: PRIMARY_SCRIPT.segments.slice(0, 9) };
    case 4:
      return { ...base, mode: "transcribing", segments: PRIMARY_SCRIPT.segments, activeSuggestionGroupId: "internship" };
    case 5: {
      const corrected: Segment = { id: "internship-corrected", text: "internship", confidence: "high" };
      const segments = [...PRIMARY_SCRIPT.segments.slice(0, 3), corrected, ...PRIMARY_SCRIPT.segments.slice(6)];
      return { ...base, mode: "review", segments };
    }
    case 6: {
      const text = "mujhe ek marketing internship ke liye resume banana hai jo simple aur professional ho";
      const userMessage: ChatMessage = { id: "demo-user", role: "user", text };
      return { ...base, mode: "sent", segments: [], messages: [userMessage, ...PRIMARY_SCRIPT.response] };
    }
    case 7:
      return {
        ...base,
        mode: "error",
        segments: SECONDARY_SCRIPT.segments,
        scriptIndex: 1,
        fallbackReason: "Didn't catch enough to work with.",
      };
    default:
      return base;
  }
}

/** Maps live app state to one of the 7 walkthrough steps, so the nav can highlight where the user actually is. */
export function currentStep(state: VoiceFlowState): number {
  switch (state.mode) {
    case "idle":
      return 1;
    case "listening":
      return 2;
    case "transcribing":
      return state.activeSuggestionGroupId ? 4 : 3;
    case "review":
      return 5;
    case "sent":
      return 6;
    case "error":
      return 7;
    default:
      return 1;
  }
}
