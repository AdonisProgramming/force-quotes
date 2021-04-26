import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';

const Quote = ({ selectedCharacter, selectedFaction, selectedList }) => {

    const [newQuote, genNewQuote] = useState('')

    const filteredCharacterList = selectedList.filter(item => item.character === selectedCharacter);
    const characterQuotes = filteredCharacterList.map(item => item.quote);

    const requestNewQuote = () => {
        const randomNumber = Math.floor(Math.random() * characterQuotes.length)
        genNewQuote(characterQuotes[randomNumber]);
    }

    return (
        <div style={quoteStyle}>
            <Button variant="primary" onClick={requestNewQuote}>New Quote</Button>
            <h3>{newQuote}</h3>
        </div >
        
    )
}

const quoteStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '2rem',
}

export default Quote
