import AsyncStorage from '@react-native-async-storage/async-storage';

const TUTORIAL_KEY = '@business_case_analyzer:has_seen_tutorial';

/**
 * Check if the user has already seen the tutorial
 */
export async function hasSeenTutorial(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(TUTORIAL_KEY);
    return value === 'true';
  } catch (error) {
    console.error('Error checking tutorial status:', error);
    return false;
  }
}

/**
 * Mark the tutorial as seen
 */
export async function markTutorialAsSeen(): Promise<void> {
  try {
    await AsyncStorage.setItem(TUTORIAL_KEY, 'true');
  } catch (error) {
    console.error('Error marking tutorial as seen:', error);
  }
}

/**
 * Reset tutorial status (for testing or user preference)
 */
export async function resetTutorial(): Promise<void> {
  try {
    await AsyncStorage.removeItem(TUTORIAL_KEY);
  } catch (error) {
    console.error('Error resetting tutorial:', error);
  }
}
