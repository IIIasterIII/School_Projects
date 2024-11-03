import React from "react";
import styles from "./styles.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import './styles.css'

const Favorites = ({ listF, updateListF }) => {
  function Copy(text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log(text);
      })
      .catch(err => {
        console.error(err);
      });
  }

  function updateLocalStorage(updatedList) {
    const account = localStorage.getItem('account');
    let parsedAccount;
    if (account) {
      parsedAccount = JSON.parse(account);
      parsedAccount.list = updatedList;
    } else {
      parsedAccount = { list: updatedList };
    }
    localStorage.setItem('account', JSON.stringify(parsedAccount));
  }

  function Delete(index) {
    const updatedList = listF.filter((_, i) => i !== index);
    updateListF(updatedList);
    updateLocalStorage(updatedList); 
  }

  return (
    <div className='fovorites'>
      <div className='favorites_container'>
        {listF.map((element, index) => (
          <li className={styles.element} key={index}>
            <span>{index + 1}. {element}</span>
            <div className={styles.element_container_div}>
              <button onClick={() => Copy(element)}><FaCopy /></button>
              <button onClick={() => Delete(index)}><FaTrashAlt /></button>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
