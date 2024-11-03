import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { PiFramerLogoFill } from "react-icons/pi";
import { HiOutlineViewList } from "react-icons/hi";
import { Link } from 'react-router-dom';

const Header = ({ LocalData }) => {
  const [nick, setNick] = useState(LocalData.nickname || '');
  useEffect(() => {
    if (LocalData && LocalData.nickname) {
      setNick(LocalData.nickname);
    }
  }, [LocalData]);

  return (
    <div className={styles.header}>
      <Link to="/" className={styles.p}>
        <PiFramerLogoFill className={styles.logo} /> Aster Project: {nick}
      </Link>
      <Link to="/" className={styles.p}>
        <HiOutlineViewList className={styles.logo} />
      </Link>
    </div>
  );
}

export default Header;
