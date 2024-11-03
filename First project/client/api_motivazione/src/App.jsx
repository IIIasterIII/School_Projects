import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Enter from "./pages/Enter";
import Favorites from "./pages/Favorites";
import Motivations from "./pages/Motivations";
import Fruits from "./pages/Fruits";

const App = () => {
  const [listF, updateListF] = useState([]);
  const [frase, setFrase] = useState(''); 
  const [LocalData, setLocalData] = useState({ nickname: '' });

  const TakeData = () => {
    const account = localStorage.getItem('account');
    if (account) {
      const parsedAccount = JSON.parse(account);
      setLocalData({ nickname: parsedAccount.nickname }); 
      if (parsedAccount.list) {
        updateListF(parsedAccount.list);
      }
    }
  };
  useEffect(() => {
    TakeData(); 
  }, []);
  return (
    <Router>
      <Routes>
        <Route element={<Layout LocalData={LocalData}/>}>
          <Route path="/" element={<Enter />} />
          <Route path="favorites" element={<Favorites listF={listF} updateListF={updateListF}/>} />
          <Route path="motivations" element={<Motivations ListF={listF} updateListF={updateListF} frase={frase} setFrase={setFrase} />} />
          <Route path="fruits" element={<Fruits listF={listF} updateListF={updateListF} frase={frase} setFrase={setFrase} />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
