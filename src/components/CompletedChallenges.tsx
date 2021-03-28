import { useContext } from 'react';
import { ChallangeContext } from '../contexts/ChallangesContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges() {
  const {challangesCompleted} = useContext(ChallangeContext);
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challangesCompleted}</span>
    </div>
  );
}