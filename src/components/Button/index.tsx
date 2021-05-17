import React from 'react';

import cn from 'classnames';
import styles from './Button.module.scss';

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'link';
  size?: 'default' | 'small';
  isLong?: boolean;
}

const Button: React.FC<Props> = ({ children, onClick, variant = 'link', size = 'default', isLong = false }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(styles.root, styles[variant], styles[size], isLong && styles.fullsize)}>
      {children}
    </button>
  );
};

export default Button;
