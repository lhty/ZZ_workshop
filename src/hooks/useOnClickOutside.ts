import { RefObject, useEffect } from 'react';

type AnyEvent = Partial<KeyboardEvent & MouseEvent & TouchEvent>;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: AnyEvent) => void,
) => {
  useEffect(() => {
    const listener = (e: AnyEvent) => {
      const el = ref?.current;

      if (!el || (el.contains(e.target as Node) && e.key !== 'Escape')) {
        return;
      }

      handler(e);
    };

    document.addEventListener(`keydown`, listener);
    document.addEventListener(`mousedown`, listener);
    document.addEventListener(`touchstart`, listener);

    return () => {
      document.addEventListener(`keydown`, listener);
      document.removeEventListener(`mousedown`, listener);
      document.removeEventListener(`touchstart`, listener);
    };
  }, [ref, handler]);
};
