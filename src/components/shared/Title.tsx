import React from 'react';

import cn from 'classnames';

import styles from './Title.module.scss';
import shared from './Shared.module.scss';

const Title: React.FC<{ text?: string; className?: string }> = ({ className, text }) => {
  if (!text) {
    return <div className={cn(styles.skeleton_title, shared.skeleton_box)} />;
  }

  return <h2 className={cn(styles.titleText, className)}>{text}</h2>;
};

export default Title;
