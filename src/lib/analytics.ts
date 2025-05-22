
import posthog from 'posthog-js';

// Initialize PostHog
export const initPostHog = () => {
  // Initialize with your project API key
  // In a real app, you'd use an environment variable for this
  posthog.init('ph_placeholder_key', {
    api_host: 'https://app.posthog.com',
    // Disable in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing();
    }
  });
};

// Capture event wrapper
export const captureEvent = (eventName: string, properties?: Record<string, any>) => {
  console.log(`Analytics: ${eventName}`, properties);
  posthog.capture(eventName, properties);
};

// Common events
export const ANALYTICS_EVENTS = {
  SYMPTOM_SELECTED: 'symptom_selected',
  SIGNUP_COMPLETED: 'signup_completed',
  RESIDENCY_ANSWERED: 'residency_answered',
  INSURANCE_CHOSEN: 'insurance_chosen',
  SLOT_RESERVED: 'slot_reserved',
  INTAKE_STARTED: 'intake_started',
  INTAKE_COMPLETED: 'intake_completed',
  PROVIDER_FINALIZED: 'provider_finalized',
  BACK_BUTTON_CLICKED: 'back_button_clicked'
};
