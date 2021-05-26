import React from 'react';

export const usePortal = (id: string, classname: string) => {
  const parentElemRef = React.useRef(document.body);
  const portalElemRef = React.useRef(document.getElementById(id) || document.createElement('div'));
  portalElemRef.current.className = classname;

  React.useEffect(() => {
    const portal = portalElemRef.current;
    parentElemRef.current.insertBefore(portal, parentElemRef.current.firstChild);
    return () => {
      portal.remove();
    };
  }, [id]);

  return [portalElemRef.current];
};
