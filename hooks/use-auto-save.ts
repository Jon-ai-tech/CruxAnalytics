import { useEffect, useRef, useState, useCallback } from 'react';

export type AutoSaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface UseAutoSaveOptions<T> {
  data: T;
  onSave: (data: T) => Promise<void>;
  interval?: number; // milliseconds
  enabled?: boolean;
}

export function useAutoSave<T>({
  data,
  onSave,
  interval = 30000, // 30 seconds default
  enabled = true,
}: UseAutoSaveOptions<T>) {
  const [status, setStatus] = useState<AutoSaveStatus>('idle');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousDataRef = useRef<T>(data);
  const isSavingRef = useRef(false);

  const save = useCallback(async () => {
    if (isSavingRef.current) return;

    try {
      isSavingRef.current = true;
      setStatus('saving');
      await onSave(data);
      setStatus('saved');
      setLastSaved(new Date());
      previousDataRef.current = data;

      // Reset to idle after 2 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Auto-save error:', error);
      setStatus('error');

      // Reset to idle after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } finally {
      isSavingRef.current = false;
    }
  }, [data, onSave]);

  const saveNow = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    await save();
  }, [save]);

  useEffect(() => {
    if (!enabled) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      return;
    }

    // Check if data has changed
    const dataChanged = JSON.stringify(data) !== JSON.stringify(previousDataRef.current);

    if (dataChanged && !isSavingRef.current) {
      // Clear existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set new timer
      timerRef.current = setTimeout(() => {
        save();
      }, interval) as any;
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [data, interval, enabled, save]);

  return {
    status,
    lastSaved,
    saveNow,
  };
}
