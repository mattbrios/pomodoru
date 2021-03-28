import { useContext } from 'react';
import { ChallangeContext } from '../contexts/ChallangesContext';

import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  const { currentXP, experienceToNextLevel } = useContext(ChallangeContext);

  const percentToNextLevel = Math.round((currentXP * 100) / experienceToNextLevel);

  return(
    <header className={styles.experienceBar}>
      <span>0</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />
        <span
          className={styles.currentExperience}
          style={{ left: `${percentToNextLevel}%` }}
        >
          {currentXP} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}