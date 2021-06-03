import React from 'react';
import { createPortal } from 'react-dom';

import { usePortal } from '../../hooks';

import { ReactComponent as CloseButton } from './assets/closeIcon.svg';
import styles from './Modal.module.scss';

const noop = () => {};
interface IModal {
  id?: string;
  isVisible?: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const Modal: React.FC<IModal> = ({
  children,
  id = 'modal card',
  isVisible = false,
  onClose,
  onNext = noop,
  onPrev = noop,
}) => {
  const [target] = usePortal(id, styles.root, isVisible);

  React.useEffect(() => {
    if (!isVisible) {
      return;
    }
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
  }, [isVisible, onClose, onNext, onPrev]);

  const wrapper = (
    <div className={styles.wrapper}>
      <CloseButton type="button" className={styles.close} onClick={onClose}>
        Close
      </CloseButton>
      {children}
    </div>
  );

  return isVisible ? createPortal(wrapper, target) : null;
};

export default Modal;
