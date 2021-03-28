import { useContext } from 'react';
import { ChallangeContext } from '../contexts/ChallangesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { name, photo, level} = useContext(ChallangeContext);

  return (
    <div className={styles.profileContainer}>
      <img src={ photo ? `https://github.com/${photo}.png` : "/user-default.svg"} alt="Profile Picture" />
      <div>
        <strong>{name}</strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          {`Level ${level}`}
        </p>
      </div>
    </div>
  );
}