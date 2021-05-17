import React from 'react';

import { navigate } from 'hookrouter';
import { LinkEnum } from '../../routes';

import { Button, Typography } from '../../components';

import Rocket from './assets/Team_Rocket_trio_OS 1.png';
import styles from './404.Module.scss';

const NotFoundPage = () => {
  return (
    <main className={styles.root}>
      <img src={Rocket} alt="Rocket" />
      <Typography className={styles.code}>404</Typography>
      <Typography className={styles.text}>
        The rocket team <mark>has won this time.</mark>
      </Typography>
      <Button variant="secondary" onClick={() => navigate(LinkEnum.HOME)}>
        Return
      </Button>
    </main>
  );
};

export default NotFoundPage;
