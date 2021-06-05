import React from 'react';
import { setQueryParams, useQueryParams } from 'hookrouter';
import { createPortal } from 'react-dom';

import { usePortal } from '../../hooks';

import { ReactComponent as CloseButton } from './assets/closeIcon.svg';
import styles from './Modal.module.scss';

interface IModal {
  el_id?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const Modal: React.FC<IModal> = ({ children, el_id = 'modal card', isOpen = false, onClose, onNext, onPrev }) => {
  const [{ id, ...params }] = useQueryParams();
  const [target] = usePortal(el_id, styles.root, isOpen || !!id);
  const modalControls = React.useMemo(
    () => ({
      onClose(params: Record<string, string>) {
        setQueryParams(params, true);
      },
      onNext(id: string) {
        setQueryParams({ id: Number(id) + 1 });
      },
      onPrev(id: string) {
        setQueryParams({ id: Math.max(1, Number(id) - 1) });
      },
    }),
    [],
  );

  React.useEffect(() => {
    if (!id) {
      return;
    }
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        modalControls.onClose(params);
      }
      if (e.key === 'ArrowRight') {
        modalControls.onNext(id);
      }
      if (e.key === 'ArrowLeft') {
        modalControls.onPrev(id);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [id, params, modalControls]);

  const wrapper = (
    <div className={styles.wrapper}>
      <CloseButton type="button" className={styles.close} onClick={() => modalControls.onClose(params)}>
        Close
      </CloseButton>
      {children}
    </div>
  );

  return id ? createPortal(wrapper, target) : null;
};

export default Modal;
