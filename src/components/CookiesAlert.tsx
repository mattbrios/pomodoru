import { Button } from '@material-ui/core';
import { useContext } from 'react';
import { ChallangeContext } from '../contexts/ChallangesContext';

import styles from '../styles/components/CookiesAlert.module.css';

export function CookiesAlert() {
  const { acceptCookiesHandler } = useContext(ChallangeContext);

  return(
    <div className={styles.container}>
      <p>Este site utiliza cookies para armazenamento dos dados preenchidos pelo visitante e dados do próprio jogo. Para o funcionamento do Pomodoru, estes cookies são obrigatórios.</p>
      <Button
        variant="contained"
        onClick={acceptCookiesHandler}
      >
        Entendi
      </Button>
    </div>
  );
}