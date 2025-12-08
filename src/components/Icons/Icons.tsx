import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export const ChartIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M3 3v18h18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 9l-5 5-3-3-4 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="18" cy="9" r="2" fill={color}/>
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M8 12l3 3 5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const AlertIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 2L2 20h20L12 2z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none"/>
    <path d="M12 9v4M12 17h.01" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const DangerIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M8 8l8 8M16 8l-8 8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const RoadIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M3 6h18M3 12h18M3 18h18" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 3v3M12 9v3M12 15v3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2"/>
  </svg>
);

export const ConstructionIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M3 21h18M4 21V9l8-6 8 6v12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 21v-6h6v6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="7" r="1.5" fill={color}/>
  </svg>
);

export const ForestIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 2L8 8h2L6 14h2l-2 6h12l-2-6h2l-4-6h2l-4-6z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill={`${color}33`}/>
    <path d="M12 14v6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const SunIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="2" fill={`${color}33`}/>
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const WheatIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 2v20M8 6c0 2 2 4 4 4s4-2 4-4M8 10c0 2 2 4 4 4s4-2 4-4M8 14c0 2 2 4 4 4s4-2 4-4M8 18c0 2 2 4 4 4s4-2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const CityIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <rect x="3" y="10" width="5" height="12" stroke={color} strokeWidth="1.5" fill={`${color}33`}/>
    <rect x="10" y="4" width="5" height="18" stroke={color} strokeWidth="1.5" fill={`${color}33`}/>
    <rect x="17" y="8" width="5" height="14" stroke={color} strokeWidth="1.5" fill={`${color}33`}/>
    <path d="M5 14h2M5 17h2M12 8h2M12 11h2M12 14h2M12 17h2M19 12h2M19 15h2M19 18h2" stroke={color} strokeWidth="1.5"/>
  </svg>
);

export const SnowIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 2v20M2 12h20M5.64 5.64l12.72 12.72M18.36 5.64L5.64 18.36" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="5" r="1.5" fill={color}/>
    <circle cx="12" cy="19" r="1.5" fill={color}/>
    <circle cx="5" cy="12" r="1.5" fill={color}/>
    <circle cx="19" cy="12" r="1.5" fill={color}/>
  </svg>
);

export const TargetIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="2" fill={color}/>
  </svg>
);

export const TrendUpIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M3 17l6-6 4 4 8-8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 7h4v4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ToolIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TruckIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M1 3h15v13H1z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    <path d="M16 8h3l3 3v5h-6V8z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    <circle cx="5.5" cy="18.5" r="2.5" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="18.5" cy="18.5" r="2.5" stroke={color} strokeWidth="2" fill="none"/>
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const MoneyIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M12 6v12M9 9h3.5a2 2 0 0 1 0 4H9m0 0h3.5a2 2 0 0 1 0 4H9" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const WrenchIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SatelliteIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M13 7L9 3m8 16l-4-4m4-9l3-3m-3 3l-2.5 2.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <rect x="8" y="8" width="8" height="8" transform="rotate(45 12 12)" stroke={color} strokeWidth="2"/>
    <path d="M3 21l3-3" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const BrainIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M9.5 2a4.5 4.5 0 0 0-3 7.91V18a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9.91A4.5 4.5 0 0 0 14.5 2" stroke={color} strokeWidth="2"/>
    <path d="M12 6v6M9 9h6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <rect x="5" y="2" width="14" height="20" rx="2" stroke={color} strokeWidth="2"/>
    <path d="M12 18h.01" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const BlockchainIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <rect x="3" y="3" width="7" height="7" stroke={color} strokeWidth="2"/>
    <rect x="14" y="3" width="7" height="7" stroke={color} strokeWidth="2"/>
    <rect x="3" y="14" width="7" height="7" stroke={color} strokeWidth="2"/>
    <rect x="14" y="14" width="7" height="7" stroke={color} strokeWidth="2"/>
    <path d="M10 6.5h4M10 17.5h4M6.5 10v4M17.5 10v4" stroke={color} strokeWidth="2"/>
  </svg>
);

export const SensorIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/>
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="1" fill={color}/>
  </svg>
);

export const TeamIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2"/>
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="17" cy="9" r="3" stroke={color} strokeWidth="2"/>
    <path d="M21 21v-1.5a3.5 3.5 0 0 0-3.5-3.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const EmailIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="2"/>
    <path d="M2 7l10 7 10-7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const GlobeIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke={color} strokeWidth="2"/>
  </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor', style }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={`${color}33`}/>
  </svg>
);
