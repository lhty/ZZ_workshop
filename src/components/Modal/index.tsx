import React from 'react';
import { createPortal } from 'react-dom';

import { usePortal } from '../../hooks';

import { ReactComponent as CloseButton } from './assets/closeIcon.svg';
import styles from './Modal.module.scss';

const noop = () => null;
interface IModal {
  el_id?: string;
  isOpen?: boolean;
  controls?: { onClose: () => void; onNext: () => void; onPrev: () => void };
}

const Modal: React.FC<IModal> = ({
  children,
  el_id = 'modal card',
  isOpen = false,
  controls = { onClose: noop, onNext: noop, onPrev: noop },
}) => {
  const [target] = usePortal(el_id, styles.root, isOpen);

  React.useEffect(() => {
    const { onClose, onNext, onPrev } = controls;
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'ArrowRight') {
        onNext();
      }
      if (e.key === 'ArrowLeft') {
        onPrev();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [controls]);

  const wrapper = (
    <div className={styles.wrapper}>
      <CloseButton type="button" className={styles.close} onClick={controls.onClose}>
        Close
      </CloseButton>
      {children}
    </div>
  );

  return isOpen ? createPortal(wrapper, target) : null;
};

export default Modal;
