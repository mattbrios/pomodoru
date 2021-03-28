import { createContext, ReactNode, useEffect, useState } from 'react';
import challanges from '../../challenges.json';
import Cookies from 'js-cookie';

import { isIOS } from 'react-device-detect';
import { LevelUpModal } from '../components/LevelUpModal';
import { CookiesAlert } from '../components/CookiesAlert';

interface Challange {
  type: 'body' | 'eye';
  description: string;
  amount: number;
  prize: string;
}

interface ChallangesContextData {
  name: string;
  photo: string;
  level: number;
  currentXP: number;
  experienceToNextLevel: number;
  challangesCompleted: number;
  activeChallange: Challange;
  isLogged: boolean;
  startNewChallange: () => void;
  skipChallange: () => void;
  challangeCompleted: () => void;
  closeLevelUpModal: () => void;
  resetCookies: () => void;
  acceptCookiesHandler: () => void;
  startApp: (name, photo) => void;
}
interface ChallangeProviderProps {
  children: ReactNode;
  name: string;
  photo: string;
  level: number;
  currentXP: number;
  challangesCompleted: number;
  isLogged: boolean;
  acceptCookies: boolean;
}

export const ChallangeContext = createContext({}as ChallangesContextData);

export function ChallangesProvider( {children, ...props}:ChallangeProviderProps ) {
  const [name, setName] = useState(props.name ?? null);
  const [photo, setPhoto] = useState(props.photo ?? "");
  const [level, setLevel] = useState(props.level ?? 1);
  const [currentXP, setCurrentXP] = useState(props.currentXP ?? 0);
  const [challangesCompleted, setChallangesCompleted] = useState(props.challangesCompleted ?? 0);
  const [activeChallange, setActiveChallange] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(props.isLogged ?? false);
  const [acceptCookies, setAcceptCookies] = useState(props.acceptCookies ?? false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    if(!isIOS){
      Notification.requestPermission();
    }
  },[]);

  useEffect(() => {
    Cookies.set('name', String(name));
    Cookies.set('photo', String(photo));
    Cookies.set('level', String(level));
    Cookies.set('currentXP', String(currentXP));
    Cookies.set('challangesCompleted', String(challangesCompleted));
    Cookies.set('isLogged', String(isLogged));
    Cookies.set('acceptCookies', String(acceptCookies));
  },[name, photo, level, currentXP, challangesCompleted, isLogged, acceptCookies]);

  function startApp(name, photo) {
    setName(name);
    setPhoto(photo);
    setIsLogged(true);

    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  function startNewChallange() {
    const randomChallangeIndex = Math.floor(Math.random() * challanges.length);
    const challange = challanges[randomChallangeIndex];
    setActiveChallange(challange);

    if( !isIOS ) {
      new Audio('/notification.mp3').play();
      if( Notification.permission === 'granted' ) {
        new Notification('Atenção! Novo desafio! Move it!', {
          body: `Desafio agora valendo ${challange.amount}xp e ${challange.prize}`,
          icon: '/favicon.png'
        });
      }
    }
  };

  function skipChallange() {
    setActiveChallange(null);
  }

  function acceptCookiesHandler() {
    setAcceptCookies(true);
  }

  function resetCookies() {
    Cookies.remove('name');
    Cookies.remove('photo');
    Cookies.remove('level');
    Cookies.remove('currentXP');
    Cookies.remove('challangesCompleted');
    Cookies.remove('isLogged');

    /* setCurrentXP(0);
    setName(undefined);
    setPhoto(undefined);
    setLevel(1);
    setChallangesCompleted(0);
    setActiveChallange(null);
    setIsLogged(false);*/

    window.location.reload();
  }

  function challangeCompleted() {
    if(!activeChallange) {
      return;
    }

    const { amount } = activeChallange;
    let finalExperience = currentXP + amount;
    if(finalExperience > experienceToNextLevel) {
      setLevel(level + 1);
      setIsLevelUpModalOpen(true);
      new Audio('/winner.mp3').play();
      finalExperience = finalExperience - experienceToNextLevel;
    }
    setCurrentXP(finalExperience)
    setActiveChallange(null);
    setChallangesCompleted(challangesCompleted + 1);
  }
  function closeLevelUpModal () {
    setIsLevelUpModalOpen(false);
  }
  
  return (
    <ChallangeContext.Provider
      value={{
        name, 
        photo, 
        level, 
        currentXP,
        experienceToNextLevel,
        challangesCompleted,
        activeChallange,
        isLogged,
        startNewChallange,
        skipChallange,
        challangeCompleted,
        closeLevelUpModal,
        resetCookies,
        acceptCookiesHandler,
        startApp,
      }}
    >
      {children}
      {isLevelUpModalOpen && (
        <LevelUpModal />
      )}
      {!acceptCookies &&  (
        <CookiesAlert />
      )}
    </ChallangeContext.Provider>
  );
}