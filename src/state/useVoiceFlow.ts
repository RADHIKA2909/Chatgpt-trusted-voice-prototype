import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import type { DemoScript } from "./mockData";
import { GENERIC_REPLY, PRIMARY_SCRIPT, SECONDARY_SCRIPT, TIMING } from "./mockData";
import type { LanguageHint, Segment, VoiceFlowAction, VoiceFlowState } from "./types";

const initialState: VoiceFlowState = {
  mode: "idle",
  languageHint: "auto",
  segments: [],
  activeSuggestionGroupId: undefined,
  isEditing: false,
  editDraft: "",
  fallbackReason: undefined,
  messages: [],
  scriptIndex: 0,
};

function scriptFor(index: number): DemoScript {
  return index === 0 ? PRIMARY_SCRIPT : SECONDARY_SCRIPT;
}

function reducer(state: VoiceFlowState, action: VoiceFlowAction): VoiceFlowState {
  switch (action.type) {
    case "SET_LANGUAGE":
      return { ...state, languageHint: action.hint };

    case "START_LISTENING":
      return {
        ...state,
        mode: "listening",
        segments: [],
        activeSuggestionGroupId: undefined,
        isEditing: false,
        editDraft: "",
        fallbackReason: undefined,
        scriptIndex: action.scriptIndex,
      };

    case "PUSH_SEGMENT":
      return { ...state, mode: "transcribing", segments: [...state.segments, action.segment] };

    case "STOP_RECORDING":
      return state.segments.length === 0 ? state : { ...state, mode: "review" };

    case "OPEN_SUGGESTION":
      return { ...state, activeSuggestionGroupId: action.groupId };

    case "CLOSE_SUGGESTION":
      return { ...state, activeSuggestionGroupId: undefined };

    case "SELECT_SUGGESTION": {
      const indices = state.segments.reduce<number[]>(
        (acc, s, i) => (s.groupId === action.groupId ? [...acc, i] : acc),
        [],
      );
      if (indices.length === 0) return state;
      const first = indices[0];
      const last = indices[indices.length - 1];
      const merged: Segment = {
        id: `${action.groupId}-corrected`,
        text: action.value,
        confidence: "high",
        corrected: true,
      };
      const nextSegments = [...state.segments.slice(0, first), merged, ...state.segments.slice(last + 1)];
      return { ...state, segments: nextSegments, activeSuggestionGroupId: undefined };
    }

    case "CLEAR_CORRECTED":
      return {
        ...state,
        segments: state.segments.map((s) => (s.id === action.segmentId ? { ...s, corrected: false } : s)),
      };

    case "START_EDIT":
      return { ...state, isEditing: true, editDraft: state.segments.map((s) => s.text).join(" ") };

    case "SET_EDIT_DRAFT":
      return { ...state, editDraft: action.value };

    case "FINISH_EDIT": {
      const text = state.editDraft.trim();
      return {
        ...state,
        isEditing: false,
        segments: text ? [{ id: "edited", text, confidence: "high" }] : [],
        mode: "review",
      };
    }

    case "SEND": {
      const text = state.segments
        .map((s) => s.text)
        .join(" ")
        .trim();
      if (!text) return state;
      return {
        ...state,
        mode: "sent",
        segments: [],
        messages: [...state.messages, { id: `u-${Date.now()}`, role: "user", text }],
      };
    }

    case "SEND_TEXT":
      return {
        ...state,
        messages: [...state.messages, { id: `u-${Date.now()}`, role: "user", text: action.text }],
      };

    case "APPEND_RESPONSE":
      return { ...state, messages: [...state.messages, ...action.messages] };

    case "GOTO_ERROR":
      return { ...state, mode: "error", fallbackReason: action.reason };

    case "GOTO_ERROR_EDIT":
      return {
        ...state,
        mode: "review",
        isEditing: true,
        editDraft: state.segments.map((s) => s.text).join(" "),
        fallbackReason: undefined,
      };

    case "RESET":
      return { ...initialState, languageHint: state.languageHint, messages: state.messages };

    case "DEMO_SET":
      return { ...state, ...action.patch } as VoiceFlowState;

    default:
      return state;
  }
}

export function useVoiceFlow() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isAssistantTyping, setAssistantTyping] = useState(false);
  const timers = useRef<number[]>([]);
  const queue = useRef<Segment[]>([]);
  const listenStartedAt = useRef(0);
  const freshAttemptCount = useRef(0);
  const forcedFailurePending = useRef(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const pushNext = useCallback(() => {
    const next = queue.current.shift();
    if (!next) return;
    dispatch({ type: "PUSH_SEGMENT", segment: next });
    if (queue.current.length > 0) {
      const id = window.setTimeout(pushNext, TIMING.wordIntervalMs);
      timers.current.push(id);
    }
  }, []);

  const startListening = useCallback(
    (scriptIndex: number) => {
      clearTimers();
      setAssistantTyping(false);
      dispatch({ type: "START_LISTENING", scriptIndex });
      queue.current = [...scriptFor(scriptIndex).segments];
      listenStartedAt.current = Date.now();
      const id = window.setTimeout(pushNext, TIMING.listeningHoldMs);
      timers.current.push(id);
    },
    [clearTimers, pushNext],
  );

  const stopRecording = useCallback(() => {
    const tooEarly =
      state.mode === "listening" && Date.now() - listenStartedAt.current < TIMING.earlyStopThresholdMs;
    const forcedFailure = forcedFailurePending.current;
    clearTimers();
    if (tooEarly || state.segments.length === 0 || forcedFailure) {
      forcedFailurePending.current = false;
      dispatch({ type: "GOTO_ERROR", reason: "Didn't catch enough to work with." });
      return;
    }
    dispatch({ type: "STOP_RECORDING" });
  }, [clearTimers, state.mode, state.segments.length]);

  const selectSuggestion = useCallback((groupId: string, value: string) => {
    dispatch({ type: "SELECT_SUGGESTION", groupId, value });
    const id = window.setTimeout(() => {
      dispatch({ type: "CLEAR_CORRECTED", segmentId: `${groupId}-corrected` });
    }, TIMING.correctionHighlightMs);
    timers.current.push(id);
  }, []);

  const send = useCallback(() => {
    const idx = state.scriptIndex;
    dispatch({ type: "SEND" });
    setAssistantTyping(true);
    const id = window.setTimeout(() => {
      setAssistantTyping(false);
      dispatch({ type: "APPEND_RESPONSE", messages: scriptFor(idx).response });
    }, TIMING.typingIndicatorMs);
    timers.current.push(id);
  }, [state.scriptIndex]);

  const sendTyped = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    dispatch({ type: "SEND_TEXT", text: trimmed });
    setAssistantTyping(true);
    const id = window.setTimeout(() => {
      setAssistantTyping(false);
      dispatch({ type: "APPEND_RESPONSE", messages: [{ id: `a-${Date.now()}`, role: "assistant", text: GENERIC_REPLY }] });
    }, TIMING.typingIndicatorMs);
    timers.current.push(id);
  }, []);

  const startFreshAttempt = useCallback(() => {
    freshAttemptCount.current += 1;
    const idx = (freshAttemptCount.current - 1) % 2;
    forcedFailurePending.current = freshAttemptCount.current === 2;
    startListening(idx);
  }, [startListening]);

  const reRecord = useCallback(() => {
    startListening(state.scriptIndex === 0 ? 1 : 0);
  }, [startListening, state.scriptIndex]);

  const tryAgain = useCallback(() => {
    startListening(state.scriptIndex);
  }, [startListening, state.scriptIndex]);

  const editFromError = useCallback(() => {
    clearTimers();
    dispatch({ type: "GOTO_ERROR_EDIT" });
  }, [clearTimers]);

  const closeToIdle = useCallback(() => {
    clearTimers();
    setAssistantTyping(false);
    dispatch({ type: "RESET" });
  }, [clearTimers]);

  const newChat = useCallback(() => {
    clearTimers();
    setAssistantTyping(false);
    freshAttemptCount.current = 0;
    forcedFailurePending.current = false;
    dispatch({
      type: "DEMO_SET",
      patch: { mode: "idle", segments: [], messages: [], isEditing: false, activeSuggestionGroupId: undefined, fallbackReason: undefined },
    });
  }, [clearTimers]);

  const demoSet = useCallback(
    (patch: Partial<VoiceFlowState>) => {
      clearTimers();
      setAssistantTyping(false);
      freshAttemptCount.current = 0;
      forcedFailurePending.current = false;
      dispatch({ type: "DEMO_SET", patch });
    },
    [clearTimers],
  );

  return {
    state,
    isAssistantTyping,
    setLanguage: (hint: LanguageHint) => dispatch({ type: "SET_LANGUAGE", hint }),
    startListening: startFreshAttempt,
    stopRecording,
    openSuggestion: (groupId: string) => dispatch({ type: "OPEN_SUGGESTION", groupId }),
    closeSuggestion: () => dispatch({ type: "CLOSE_SUGGESTION" }),
    selectSuggestion,
    startEdit: () => dispatch({ type: "START_EDIT" }),
    setEditDraft: (value: string) => dispatch({ type: "SET_EDIT_DRAFT", value }),
    finishEdit: () => dispatch({ type: "FINISH_EDIT" }),
    send,
    sendTyped,
    reRecord,
    tryAgain,
    editFromError,
    closeToIdle,
    newChat,
    demoSet,
  };
}

export type VoiceFlow = ReturnType<typeof useVoiceFlow>;
