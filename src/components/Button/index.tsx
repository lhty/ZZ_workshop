import React from 'react';

import styles from './Button.module.scss';

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} type="button" className={styles.root}>
      {children}
    </button>
  );
};

export default Button;
