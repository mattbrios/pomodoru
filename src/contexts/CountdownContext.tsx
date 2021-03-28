import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallangeContext } from "./ChallangesContext";

interface CountdownContextData {
  isActive: boolean;
  hasFinished: boolean;
  minutes: number;
  seconds: number;
  startCountdown: () => void;
  resetCountdown: () => void;
}
interface CountdownProviderProps {
  children:ReactNode;
}
export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider( {children}:CountdownProviderProps ) {

  let countdownTimeout:NodeJS.Timeout;
  let allMinutes = 25;
  const { startNewChallange } = useContext(ChallangeContext);

  const [time, setTime] = useState(allMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if(isActive && time === 0) {
      // resetCountdown();
      setHasFinished(true);
      setIsActive(false);

      startNewChallange();
    }
  }, [isActive, time])

  function startCountdown () {
    setIsActive(true);
  }
  function resetCountdown () {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinished(false);
    setTime(allMinutes * 60);
  }

  return(
    <CountdownContext.Provider
      value={{
        isActive,
        hasFinished,
        minutes,
        seconds,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}