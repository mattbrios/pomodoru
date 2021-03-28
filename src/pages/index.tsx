import Head from 'next/head';

import { CompletedChallenges } from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallangeBox } from "../components/ChallangeBox";

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import { GetServerSideProps } from 'next';
import { ChallangesProvider } from '../contexts/ChallangesContext';
import { HeaderApp } from '../components/HeaderApp';
import { Login } from '../components/Login';

interface HomeProps {
  name: string;
  photo: string;
  level: number;
  currentXP: number;
  challangesCompleted: number;
  isLogged: boolean;
  acceptCookies: boolean;
}

export default function Home(props: HomeProps) {

  return (
    <ChallangesProvider
      name={props.name}
      photo={props.photo}
      level={props.level}
      currentXP={props.currentXP}
      challangesCompleted={props.challangesCompleted}
      isLogged={props.isLogged}
      acceptCookies={props.acceptCookies}
    >
      {props.isLogged ? (
        <>
          <CountdownProvider>
            <HeaderApp />
            <div className={styles.container}>
              <Head>
                <title>Home / Moveit - Mateus Rios</title>
              </Head>
              <ExperienceBar />
              <section>
                <div>
                  <Profile />
                  <CompletedChallenges />
                  <Countdown />
                </div>
                <div>
                  <ChallangeBox />
                </div>
              </section>
            </div>
          </CountdownProvider>
        </>
      ) : (
        <Login />
      )}
    </ChallangesProvider>
  )
}

export const getServerSideProps:GetServerSideProps = async (ctx) => {
  const { name, photo, level, currentXP, challangesCompleted, isLogged, acceptCookies } = ctx.req.cookies;
  
  return {
    props: {
      name: String(name),
      photo: String(photo),
      level: Number(level),
      currentXP: Number(currentXP),
      challangesCompleted: Number(challangesCompleted),
      isLogged: isLogged === "true",
      acceptCookies: acceptCookies === "true",
    }
  }
}