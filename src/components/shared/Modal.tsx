import React from 'react';
import { createPortal } from 'react-dom';

import { usePortal } from '../../hooks';
import styles from './Modal.module.scss';

const Modal: React.FC<{ id: string; onClose: () => void }> = ({ children, id, onClose }) => {
  const [target] = usePortal(id, styles.root);
  const wrapper = (
    <div className={styles.wrapper}>
      <button type="button" className={styles.close} onClick={onClose}>
        Close
      </button>
      {children}
    </div>
  );

  return createPortal(wrapper, target);
};

export default Modal;
