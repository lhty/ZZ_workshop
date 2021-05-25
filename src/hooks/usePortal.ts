import React from 'react';

const createRootElement = (id: string) => {
  const rootContainer = document.createElement('div');
  rootContainer.setAttribute('id', id);
  return rootContainer;
};

const addRootElement = (rootElem: Element) => {
  document.body.insertBefore(rootElem, document.body.lastElementChild.nextElementSibling);
};

export const usePortal = (id: string) => {
  const rootElemRef = React.useRef(document.createElement('div'));

  React.useEffect(() => {
    const existingParent = document.querySelector(`#${id}`);
    const parentElem = existingParent || createRootElement(id);
    const rootElem = rootElemRef.current;

    if (!existingParent) {
      addRootElement(parentElem);
    }

    parentElem?.appendChild(rootElemRef.current);
    return () => {
      rootElem.remove();
      if (!parentElem.childElementCount) {
        parentElem.remove();
      }
    };
  }, [id]);

  const getRootElem = () => {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div');
    }
    return rootElemRef.current;
  };

  return getRootElem();
};
