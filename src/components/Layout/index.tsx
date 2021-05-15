import React from 'react';
import cn from 'classnames';

import styles from './Layout.module.scss';

type Props = {
  className: string | null;
};

const Layout: React.FC<Props> = ({ children = null, className = null }) => (
  <div className={cn(styles.root, className)}>{children}</div>
);

export default Layout;
