import React from 'react';

import styles from './Minion.module.css';
import minionImg from './minion.png';

type MinionProps = {
  label?: string | number;
};

export const Minion: React.FC<MinionProps> = ({ label }) => (
  <div className={styles.minion}>
    <img src={minionImg} />
    <span>{label ? `${label}` : 'minion'}</span>
  </div>
);
