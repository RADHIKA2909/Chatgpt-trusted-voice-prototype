import { ChatShell } from "./components/ChatShell";
import { PhoneFrame } from "./components/PhoneFrame";
import { VoiceOverlay } from "./components/VoiceOverlay";
import { useVoiceFlow } from "./state/useVoiceFlow";
import { WalkthroughNav } from "./walkthrough/WalkthroughNav";

export default function App() {
  const flow = useVoiceFlow();

  return (
    <div className="page">
      <div className="page-header">
        <h1>Trusted Voice — Live Transcript &amp; Correction</h1>
        <p>A proposed ChatGPT mobile feature: see what ChatGPT heard, catch uncertainty, and fix it before you send.</p>
      </div>

      <div className="stage">
        <PhoneFrame>
          <ChatShell
            messages={flow.state.messages}
            isAssistantTyping={flow.isAssistantTyping}
            languageHint={flow.state.languageHint}
            onLanguageChange={flow.setLanguage}
            onStartVoice={flow.startListening}
            onSendText={flow.sendTyped}
            onNewChat={flow.newChat}
          />
          <VoiceOverlay flow={flow} />
        </PhoneFrame>

        <WalkthroughNav flow={flow} />
      </div>
    </div>
  );
}
