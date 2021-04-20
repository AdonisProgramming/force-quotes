import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Quote from './components/Quote'


function App() {

   const [error, setError] = useState(null);
   const [isLoaded, setIsLoaded] = useState(false);
   const [items, setItems] = useState([]);
   const [selectedCharacter, setCharacter] = useState('');
   const [selectedFaction, setFaction] = useState('')
   const [selectedList, setList] = useState([]);

   useEffect(() => {
      fetch("/api/v1/quotes/")
         .then(res => res.json())
         .then(
            (result) => {
               setIsLoaded(true);
               setItems(result);
            },

            (error) => {
               setIsLoaded(true);
               setError(error);
            }
         )
   }, [])

   if (error) {
      return <div>Error: {error.message}</div>;
   } else if (!isLoaded) {
      return <div>Loading...</div>;
   }


   const RepublicList = items.filter(item => item.faction === 'Republic');
   const uniqueRepublicCharacterList = [...new Map(RepublicList.map(item => [item.character, item])).values()]

   const RebellionList = items.filter(item => item.faction === 'Rebellion');
   const uniqueRebellionCharacterList = [...new Map(RebellionList.map(item => [item.character, item])).values()]

   const SeparatistsList = items.filter(item => item.faction === 'Separatists');
   const uniqueSeparatistsCharacterList = [...new Map(SeparatistsList.map(item => [item.character, item])).values()]

   const EmpireList = items.filter(item => item.faction === 'Empire');
   const uniqueEmpireCharacterList = [...new Map(EmpireList.map(item => [item.character, item])).values()];

   const getSelection = (e) => {
      setCharacter(e.target.innerText);
      setFaction(e.target.parentNode.parentNode.firstChild.innerText);
      getList(e.target.parentNode.parentNode.firstChild.innerText);
   }

   const getList = (selectedFaction) => {
      if (selectedFaction === "The Republic") {
         setList(RepublicList);
      } else if (selectedFaction === "The Rebellion") {
         setList(RebellionList);
      } else if (selectedFaction === "The Separatists") {
         setList(SeparatistsList);
      } else {
         setList(EmpireList);
      }
   }

   return (
      <div className="grid-container">
         <div className="banner">
            <Banner />
         </div>
         <div className="characters">
            <div id='goodGuys'>
               <ul>
                  <DropdownButton id={"republicButton"} title={'The Republic'}>
                     {uniqueRepublicCharacterList.map(item => (
                        <Dropdown.Item key={item.character} href="#/action-1" onClick={getSelection}>{item.character}</Dropdown.Item>
                     ))}
                  </DropdownButton>
               </ul>
               <ul>
                  <DropdownButton id={"rebellionButton"} title={'The Rebellion'} >
                     {uniqueRebellionCharacterList.map(item => (
                        <Dropdown.Item key={item.character} href="#/action-1" onClick={getSelection}>{item.character}</Dropdown.Item>
                     ))}
                  </DropdownButton>
               </ul>
            </div>
            <div id='badGuys'>
               <ul>
                  <DropdownButton id={'separatistsButton'} title={'The Separatists'}>
                     {uniqueSeparatistsCharacterList.map(item => (
                        <Dropdown.Item key={item.character} href="#/action-1" onClick={getSelection}>{item.character}</Dropdown.Item>
                     ))}
                  </DropdownButton>
               </ul>
               <ul>
                  <DropdownButton id={"empireButton"} title={'The Empire'}>
                     {uniqueEmpireCharacterList.map(item => (
                        <Dropdown.Item key={item.character} href="#/action-1" onClick={getSelection}>{item.character}</Dropdown.Item>
                     ))}
                  </DropdownButton>
               </ul>
            </div>
         </div>
         <div className="quote">
            <Quote selectedCharacter={selectedCharacter} selectedFaction={selectedFaction} selectedList={selectedList} />
         </div>
         <div className="footer"></div>
         <div className="left"></div>
         <div className="right"></div>
      </div>
   );
}

export default App;
