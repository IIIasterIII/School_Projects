import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { Link } from 'react-router-dom'

const Motivations = ({frase, setFrase}) => {
  const [list, setList] = useState([]);
  const container = useRef(null);
  const [prevPos, setPrevPos] = useState(null); 
  const [prevNum, setPrevNum] = useState(null)

  function StartRoll(min, length) {
    let pos;
    do {
      pos = Math.floor(Math.random() * (5 - min + 1)) + min;
    } while (pos === prevPos); 

    const rotations = [
      { rotateX: 0, rotateY: 0 },
      { rotateX: 180, rotateY: 0 },
      { rotateX: 0, rotateY: 90 },
      { rotateX: 0, rotateY: -90 },
      { rotateX: 90, rotateY: 0 },
      { rotateX: -90, rotateY: 0 },
    ];
    let num;
    do {
        num = Math.floor(Math.random() * (length - min + 1)) + min;
      } while (num === prevNum); 

    if (container.current) {
      setFrase(list[num]);
      const { rotateX, rotateY } = rotations[pos];
      container.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      setPrevPos(pos);
      setPrevNum(num)
    }
  }

  useEffect(() => {
    const TakeFraseList = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/FrasesList`);
        setList(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    TakeFraseList();
  }, []);

  return (
    <div className={styles.motivation}>
      <div className={styles.motivation_container}>
        <div
          className={styles.dice_container}
          onClick={() => StartRoll(0, list.length - 1)}
          ref={container}>
          <div className={styles.dice_top}>1</div>
          <div className={styles.dice_bottom}>2</div>
          <div className={styles.dice_left}>3</div>
          <div className={styles.dice_right}>4</div>
          <div className={styles.dice_front}>5</div>
          <div className={styles.dice_back}>6</div>
        </div>
        <h1 className={styles.frase}>{frase}</h1>
        <Link to="/fruits" className={styles.motivation_button}>Select</Link>
      </div>
    </div>
  );
};

export default Motivations;
