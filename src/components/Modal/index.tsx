import { setQueryParams, useQueryParams } from 'hookrouter';
import React from 'react';
import { createPortal } from 'react-dom';

import { usePortal } from '../../hooks';

import { ReactComponent as CloseButton } from './assets/closeIcon.svg';
import styles from './Modal.module.scss';

const Modal: React.FC<{ id?: string }> = ({ children, id = 'modal card' }) => {
  const [target] = usePortal(id, styles.root);
  const [params] = useQueryParams();

  const handleClose = () => {
    delete params.id;
    setQueryParams(params);
  };

  const wrapper = (
    <div className={styles.wrapper}>
      <CloseButton type="button" className={styles.close} onClick={handleClose}>
        Close
      </CloseButton>
      {children}
    </div>
  );

  return createPortal(wrapper, target);
};

export default Modal;
