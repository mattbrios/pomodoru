import { useContext } from 'react';
import { ChallangeContext } from '../contexts/ChallangesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallangeBox.module.css';

export function ChallangeBox() {
  const { activeChallange, skipChallange, challangeCompleted } = useContext(ChallangeContext);
  const {resetCountdown} = useContext(CountdownContext);

  function completedChallange() {
    challangeCompleted();
    resetCountdown();
  }

  function failedChallange() {
    skipChallange();
    resetCountdown();
  }
  
  return (
    <div className={styles.challangeBoxContainer}>
      { activeChallange ? (
        <div className={styles.challangeBoxActive}>
          <header>Ganhe {activeChallange.amount} xp</header>

          <main>
            <img src={`icons/${activeChallange.type}.svg`} alt="Challange Image" />
            <strong>Novo desafio</strong>
            <p>{activeChallange.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challangeButtonFailed}
              onClick={failedChallange}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challangeButtonSucceeded}
              onClick={completedChallange}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challangeNotActive}>
          <strong>Inicie um ciclo<br/>para receber desafios a serem completados!</strong>
          <div>
            <img src="icons/level-up.svg" alt="Level up" />
            <span>Complete-os, ganhe experiência e avance de level!</span>
          </div>
        </div>
      )}
    </div>
  );
}