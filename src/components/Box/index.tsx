import React from 'react';

import cn from 'classnames';
import styles from './Box.module.scss';

interface IBox {
  className?: string;
  type?: 'sprite' | 'label' | 'modal';
  id?: number;
  color?: string;
}

const Box: React.FC<IBox> = ({ children, className, type, id, color = 'default' }) => {
  switch (type) {
    case 'sprite':
      return <div className={cn(styles.root, styles[`gradient_${color}`], className)}>{children}</div>;
    case 'label':
      return (
        <span data-type={color} className={cn(styles.root, styles.label, styles[color])}>
          {color}
        </span>
      );
    case 'modal':
      return (
        <div className={cn(styles.root, styles.modal, styles[`gradient_darker${color}`], className)}>{children}</div>
      );
    default:
      return (
        <div className={cn(styles.root, styles.default, styles.card, className)}>
          <div data-id={id} className={styles.card_id} />
          {children}
        </div>
      );
  }
};

export default Box;
