import { Button, InputAdornment, TextField } from '@material-ui/core';
import { useContext, useState } from 'react';
import { ChallangeContext } from '../contexts/ChallangesContext';

import style from '../styles/components/Login.module.css';

export function Login() {
  const { startApp } = useContext(ChallangeContext);
  const [valueName, setValueName] = useState("");
  const [valueGithub, setValueGitHub] = useState("");


  function submitHandler(e) {
    e.preventDefault();
    startApp(valueName, valueGithub);
  }

  function nameChange(e) {
    setValueName(e.target.value);
  }
  function githubChange(e) {
    setValueGitHub(e.target.value);
  }
  return (
    <div className={style.container}>
      <img src="/pomodoru.svg" alt="Pomodoru"/>
      <div className={style.formContent}>
        <p>Preencha os campos abaixo para começar a usar o Pomodoru</p>
        <form>
          <TextField
            className={style.customTextField}
            variant="outlined"
            name="name"
            type="text"
            label="Seu nome"
            onChange={nameChange}
            required
          />
          <TextField
            label="github profile"
            id="github"
            variant="outlined"
            className={style.customTextField}
            onChange={githubChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">https://github.com/</InputAdornment>,
            }}
          />
          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
            type="submit"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}