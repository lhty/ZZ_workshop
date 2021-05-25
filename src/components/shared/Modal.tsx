import React from 'react';
import { createPortal } from 'react-dom';

import { usePortal } from '../../hooks';

const Modal: React.FC<{ id: string }> = ({ children, id }) => {
  const target = usePortal(id);
  return createPortal(children, target);
};

export default Modal;
