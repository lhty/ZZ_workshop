import React from 'react';
import { random } from '../lib';

type useRandomIntervalType = (callback: () => void, minDelay?: number, maxDelay?: number) => void;

export const useRandomInterval: useRandomIntervalType = (callback, minDelay = 0, maxDelay = 0) => {
  const timeoutId = React.useRef(0);
  const savedCallback = React.useRef(callback);
  React.useEffect(() => {
    savedCallback.current = callback;
  });
  React.useEffect(() => {
    if (minDelay && maxDelay) {
      const handleTick = () => {
        const nextTickAt = random(minDelay, maxDelay);
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current();
          handleTick();
        }, nextTickAt);
      };
      handleTick();
    }
    return () => window.clearTimeout(timeoutId.current);
  }, [minDelay, maxDelay]);
  const cancel = React.useCallback(() => window.clearTimeout(timeoutId.current), []);
  return cancel;
};
