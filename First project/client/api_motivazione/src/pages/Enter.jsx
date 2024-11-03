import React, { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const Enter = () => {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate(); 
  const TakeAccount = () => {
    if (nickname.trim() !== "") {
      localStorage.setItem('account', JSON.stringify({
        nickname: nickname,
        list: [] 
      }));
      navigate('/motivations'); 
    }
  };

  return (
    <div className={styles.enter}>
      <div className={styles.cube} style={{ left: '10%', animationDuration: '2s', animationDelay: '0s' }}></div>
      <div className={styles.cube} style={{ left: '30%', animationDuration: '3s', animationDelay: '0.5s' }}></div>
      <div className={styles.cube} style={{ left: '50%', animationDuration: '2.5s', animationDelay: '1s' }}></div>
      <div className={styles.cube} style={{ left: '70%', animationDuration: '4s', animationDelay: '1.5s' }}></div>
      <div className={styles.cube} style={{ left: '90%', animationDuration: '2.8s', animationDelay: '2s' }}></div>
      <div className={styles.enter_container}>
        <input
          type="text"
          placeholder="Nickname"
          className={styles.input}
          onChange={(e) => setNickname(e.target.value)} 
        />
        <button className={styles.select} onClick={TakeAccount}>Start</button> 
      </div>
    </div>
  );
};

export default Enter;
