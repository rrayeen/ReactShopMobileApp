import {useEffect, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';

/**
 * This hook allows you to track the current state of the app (foreground/background)
 * and run a callback when the state changes.
 *
 * @param {AppStateSettings} settings
 * @prop {Function} onChange? - called when the app state changes
 * @prop {Function} onForeground? - called when the app becomes active
 * @prop {Function} onBackground? - called when the app becomes inactive or goes to the background
 * @returns {Object} - an object with the current app state
 */
interface AppStateSettings {
  onChange?: (status: AppStateStatus) => void;
  onForeground?: () => void;
  onBackground?: () => void;
}

export const useAppState = ({
  onChange,
  onForeground,
  onBackground,
}: AppStateSettings) => {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState,
  );

  useEffect(() => {
    /**
     * This function is called whenever the app state changes.
     * It updates the local state and calls the onChange callback if provided.
     * It also calls onForeground or onBackground depending on the new state.
     */
    function handleAppStateChange(nextAppState: AppStateStatus) {
      setAppState(prevAppState => {
        if (nextAppState === 'active' && prevAppState !== 'active') {
          // If the app is becoming active, call onForeground
          onForeground && onForeground();
        } else if (
          prevAppState === 'active' &&
          nextAppState.match(/inactive|background/)
        ) {
          // If the app is becoming inactive or going to the background, call onBackground
          onBackground && onBackground();
        }
        return nextAppState;
      });

      // Call the onChange callback if provided
      onChange && onChange(appState);
    }

    // Add a listener for app state changes
    const appStateListener = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    // Remove the listener when the component is unmounted
    return () => appStateListener.remove();
  }, [onChange, onForeground, onBackground, appState]);

  return {appState};
};
