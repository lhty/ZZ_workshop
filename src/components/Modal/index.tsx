import React from 'react';
import { createPortal } from 'react-dom';

import { usePortal } from '../../hooks';

import { ReactComponent as CloseButton } from './assets/closeIcon.svg';
import styles from './Modal.module.scss';

const Modal: React.FC<{ id?: string }> = ({ children, id = 'modal card' }) => {
  const [target] = usePortal(id, styles.root);
  const wrapper = (
    <div className={styles.wrapper}>
      <CloseButton type="button" className={styles.close} onClick={() => target.remove()}>
        Close
      </CloseButton>
      {children}
    </div>
  );

  return createPortal(wrapper, target);
};

export default Modal;
