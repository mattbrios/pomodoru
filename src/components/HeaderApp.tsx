import { useContext } from 'react';
import { ChallangeContext } from '../contexts/ChallangesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import style from '../styles/components/HeaderApp.module.css';

export function HeaderApp() {
  const { resetCookies } = useContext(ChallangeContext); 
  const { resetCountdown } = useContext(CountdownContext);

  const resetHandler = () => {
    resetCountdown();
    resetCookies();
  }

  return (
    <div className={style.container}>
      <div>
        <img src="/pomodoru.svg" alt="Pomodoru"/>
      </div>
      <div>
        <button type="button" onClick={resetHandler}>Reset App</button>
      </div>
    </div>
  );
}