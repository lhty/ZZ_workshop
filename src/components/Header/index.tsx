import React from 'react';

import cn from 'classnames';

import { A, usePath } from 'hookrouter';
import { MAIN_MENU } from '../../routes';

import { ReactComponent as Logo } from './assets/Logo.svg';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.root}>
      <div className={styles.wrap}>
        <div className={styles.pokemonLogo}>
          <Logo />
        </div>
        <div className={styles.menuWrap}>
          <NavMenu />
        </div>
      </div>
    </header>
  );
};

// eslint-disable-next-line spaced-comment
/* React 16 array return type no solution in TS without <></> hack so far(*/
const NavMenu: React.FC = () => {
  const path = usePath();
  return (
    <>
      {MAIN_MENU.map(({ title, link }) => (
        <A key={title + link} href={link} className={cn(styles.menuLink, { [styles.activeLink]: link === path })}>
          {title}
        </A>
      ))}
    </>
  );
};

export default React.memo(Header);
