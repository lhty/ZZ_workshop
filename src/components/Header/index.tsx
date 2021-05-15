import React from 'react';

import { ReactComponent as Logo } from './assets/Logo.svg';
import styles from './Header.module.scss';

const MENU_ITEMS = [
  { id: 0, value: 'Home', link: '#' },
  { id: 1, value: 'Pokédex', link: '#' },
  { id: 2, value: 'Legendaries', link: '#' },
  { id: 3, value: 'Documentation', link: '#' },
];

type menuItem = {
  id: number;
  value: string;
  link: string;
};

interface Props {
  items?: Array<menuItem>;
}

const Header: React.FC<Props> = ({ items = MENU_ITEMS }) => {
  return (
    <header className={styles.root}>
      <div className={styles.wrap}>
        <div className={styles.pokemonLogo}>
          <Logo />
        </div>
        <div className={styles.menuWrap}>
          {items.map(({ id, value, link }) => (
            <a key={id} href={link} className={styles.menuLink}>
              {value}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
