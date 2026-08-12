interface IconProps {
  size?: number;
  className?: string;
}

const base = (size = 20) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function MenuIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden="true">
      <line x1="3.5" y1="6.5" x2="20.5" y2="6.5" />
      <line x1="3.5" y1="12" x2="20.5" y2="12" />
      <line x1="3.5" y1="17.5" x2="20.5" y2="17.5" />
    </svg>
  );
}

export function EditIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden="true">
      <path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3Z" />
      <path d="M13.5 8 16 10.5" />
    </svg>
  );
}

export function CloseIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden="true">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

export function BackIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden="true">
      <path d="M14.5 5 8 12l6.5 7" />
    </svg>
  );
}

export function MicIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
      <line x1="12" y1="17.5" x2="12" y2="21" />
      <line x1="8.5" y1="21" x2="15.5" y2="21" />
    </svg>
  );
}

export function StopIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden="true" fill="currentColor" stroke="none">
      <rect x="7" y="7" width="10" height="10" rx="2" />
    </svg>
  );
}

export function KeyboardIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden="true">
      <rect x="3" y="6.5" width="18" height="12" rx="2.2" />
      <line x1="7" y1="10.5" x2="7" y2="10.5" />
      <line x1="10.3" y1="10.5" x2="10.3" y2="10.5" />
      <line x1="13.6" y1="10.5" x2="13.6" y2="10.5" />
      <line x1="17" y1="10.5" x2="17" y2="10.5" />
      <line x1="7" y1="14" x2="17" y2="14" />
    </svg>
  );
}

export function SendIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden="true" fill="currentColor" stroke="none">
      <path d="M4 12 19.5 4.5c.9-.44 1.8.46 1.36 1.36L13.6 21c-.4.83-1.6.73-1.86-.15L10 15l-5.85-1.74c-.88-.26-.98-1.46-.15-1.86Z" />
    </svg>
  );
}

export function CheckIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden="true">
      <path d="M4.5 12.5 9 17l10.5-11" />
    </svg>
  );
}

export function RefreshIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden="true">
      <path d="M4.5 12a7.5 7.5 0 0 1 12.6-5.5M19.5 12a7.5 7.5 0 0 1-12.6 5.5" />
      <path d="M17 4.5v3.3h-3.3" />
      <path d="M7 19.5v-3.3h3.3" />
    </svg>
  );
}

export function FileIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden="true">
      <path d="M7 3.5h7l4 4V19a1.3 1.3 0 0 1-1.3 1.3H7A1.3 1.3 0 0 1 5.7 19V4.8A1.3 1.3 0 0 1 7 3.5Z" />
      <path d="M14 3.5V8h4.3" />
    </svg>
  );
}

export function FaceIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <line x1="9" y1="10.2" x2="9" y2="10.2" strokeWidth="2.6" />
      <line x1="15" y1="10.2" x2="15" y2="10.2" strokeWidth="2.6" />
      <path d="M8.7 15.8a4.6 4.6 0 0 1 6.6 0" />
    </svg>
  );
}

export function GlobeIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <ellipse cx="12" cy="12" rx="3.6" ry="8.5" />
      <line x1="3.7" y1="12" x2="20.3" y2="12" />
    </svg>
  );
}

export function SignalIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 14" fill="currentColor" className={className} aria-hidden="true">
      <rect x="0" y="9" width="3.4" height="5" rx="0.8" />
      <rect x="5.3" y="6.5" width="3.4" height="7.5" rx="0.8" />
      <rect x="10.6" y="3.5" width="3.4" height="10.5" rx="0.8" />
      <rect x="15.9" y="0.5" width="3.4" height="13.5" rx="0.8" />
    </svg>
  );
}

export function WifiIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M2 5.2a11.5 11.5 0 0 1 16 0" />
      <path d="M5 8.4a7.2 7.2 0 0 1 10 0" />
      <path d="M8.2 11.5a2.9 2.9 0 0 1 3.6 0" />
    </svg>
  );
}

export function BatteryIcon({ size = 26, className }: IconProps) {
  return (
    <svg width={size} height={size * (13 / 26)} viewBox="0 0 26 13" fill="none" className={className} aria-hidden="true">
      <rect x="0.75" y="0.75" width="22" height="11.5" rx="3.2" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <rect x="2.3" y="2.3" width="18.9" height="8.4" rx="1.9" fill="currentColor" />
      <rect x="23.3" y="4.3" width="1.8" height="4.4" rx="0.9" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function PlusIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
