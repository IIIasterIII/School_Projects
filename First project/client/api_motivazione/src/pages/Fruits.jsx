import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Fruits = ({ updateListF, frase, setFrase }) => {
  const [Flist, setFList] = useState([]);
  const [pos, setPos] = useState(0);
  const container1 = useRef(null);
  const container2 = useRef(null);
  const [isWaiting, setIsWaiting] = useState(false);

  const rotations = [
    { rotateY: 0, translateZ: 200 },
    { rotateY: 45, translateZ: 200 },
    { rotateY: 90, translateZ: 200 },
    { rotateY: 135, translateZ: 200 },
    { rotateY: 180, translateZ: 200 },
    { rotateY: 225, translateZ: 200 },
    { rotateY: 270, translateZ: 200 },
    { rotateY: 315, translateZ: 200 },
  ];

  useEffect(() => {
    const TakeFruits = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/FruitsList");
        setFList(response.data);
      } catch (err) {
        console.error("Error fetching fruits:", err);
      }
    };
    TakeFruits();
  }, []);

  const updateTransforms = () => {
    const children = container1.current.children;
    for (let i = 0; i < children.length; i++) {
      const index = (i - pos + rotations.length) % rotations.length;
      const transform = rotations[index];
      children[i].style.transform = `rotateY(${transform.rotateY}deg) translateZ(${transform.translateZ}px)`;
    }
  };

  const Left = () => {
    if (isWaiting) return;
    setIsWaiting(true);
    setPos((prev) => (prev - 1 + rotations.length) % rotations.length);
    setTimeout(() => setIsWaiting(false), 500);
  };

  const Right = () => {
    if (isWaiting) return;
    setIsWaiting(true);
    setPos((prev) => (prev + 1) % rotations.length);
    setTimeout(() => setIsWaiting(false), 500);
  };

  useEffect(() => {
    updateTransforms();
    if (container2.current) {
      const ulElements = Array.from(container2.current.children).filter(
        (child) => child.tagName === "UL"
      );
      ulElements.forEach((el, index) => {
        el.classList.toggle(styles.active, index === pos);
      });
    }
  }, [pos]);

  const Selected = () => {
    setFrase((prev) => prev + " " + Flist[pos]);
  };

  const Create = () => {
    updateListF((prev) => [...prev, frase]);
    const account = localStorage.getItem('account');
    let parsedAccount;
    if (account) {
        parsedAccount = JSON.parse(account);
        if (!parsedAccount.list) {
            parsedAccount.list = [];
        }
        parsedAccount.list.push(frase);
    } else {
        parsedAccount = { list: [frase] };
    }
    localStorage.setItem('account', JSON.stringify(parsedAccount));
    setFrase(null)
};


  return (
    <div className={styles.fruits}>
      <h1 className={styles.frase2}>{frase}</h1>
      <div className={styles.Fruits_container} ref={container1}>
        {Flist.map((el, index) => (
          <ul key={index}>{el}</ul>
        ))}
      </div>
      <div className={styles.slider_container} ref={container2}>
        <button className={styles.left} onClick={Left}>
          <FaAngleLeft />
        </button>
        {Flist.map((_, index) => (
          <ul key={index} className={index === pos ? styles.active : ""}></ul>
        ))}
        <button className={styles.right} onClick={Right}>
          <FaAngleRight />
        </button>
      </div>
      <button className={styles.select} onClick={Selected}>SELECT</button>
      <button className={styles.select} onClick={Create}>CREATE</button>
    </div>
  );
};

export default Fruits;
