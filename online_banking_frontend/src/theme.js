export const OceanProfessionalTheme = {
  name: 'Ocean Professional',
  colors: {
    primary: '#2563EB',    // blue
    secondary: '#F59E0B',  // amber
    success: '#10B981',    // green tweak for clarity
    error: '#EF4444',      // red
    background: '#f9fafb', // light gray
    surface: '#ffffff',    // white
    text: '#111827',       // almost black
    textMuted: '#6B7280',  // gray-500
    border: '#E5E7EB',     // gray-200
    subtleBlue: 'rgba(37, 99, 235, 0.08)',
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
  },
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.04)',
    md: '0 4px 8px rgba(0,0,0,0.08)',
    lg: '0 10px 20px rgba(0,0,0,0.12)',
  },
};

// PUBLIC_INTERFACE
export function getApiBase() {
  /** Returns API base from env; empty or undefined means mock mode. */
  const base = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || '';
  return base;
}

// PUBLIC_INTERFACE
export function isMockMode() {
  /** Determines if the app should use mock services. */
  const base = getApiBase();
  return !base || base.trim() === '';
}
