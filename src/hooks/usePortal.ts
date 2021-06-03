import React from 'react';

export const usePortal = (id: string, classname: string, condition?: boolean) => {
  const parentElemRef = React.useRef<HTMLElement>(document.body);
  const portalElemRef = React.useRef<HTMLElement>(document.getElementById(id) || document.createElement('div'));

  React.useEffect(() => {
    const portal = portalElemRef.current;

    if (!condition) {
      return;
    }

    portalElemRef.current.className = classname;
    parentElemRef.current.insertBefore(portal, parentElemRef.current.firstChild);
    return () => {
      portal.remove();
    };
  }, [id, classname, condition]);

  return [portalElemRef.current];
};
