import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';

const CardDeck = () => {

    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['H', 'D', 'C', 'S']; // hearts diamonds clubs spades
    const [deck, setDeck] = useState(getDeck());
    console.log(deck);

    // Create a deck of cards
    function getDeck() {

        const deck = [];
        for (let rank of ranks) {
            for (let suit of suits) {
                const card = {
                    rank: rank,
                    suit: suit,
                    imgUrl: require(`../../cards-assets/${rank}${suit}.svg`),
                };
                deck.push(card);
            }
        }
        return deck;
    }

    /* Shuffle the deck using the Fisher-Yates algorithm
    https://www.tutorialspoint.com/what-is-fisher-yates-shuffle-in-javascript
    */
    function shuffleDeck() {
        const shuffledDeck = [...deck];
        for (let i = shuffledDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
        }
        setDeck(shuffledDeck);
    }

    // Draw a card by removing it from the deck
    function drawCard() {
        const drawnCard = deck.splice(0, 1);
        setDeck([...deck]);
        return drawnCard[0];
    }

    // Sort the deck by rank or suit
    function sortDeck(sortBy) {
        const sortedDeck = [...deck];
        if (sortBy === 'rank') {
            sortedDeck.sort((a, b) => ranks.indexOf(a.rank) - ranks.indexOf(b.rank));
        } else if (sortBy === 'suit') {
            sortedDeck.sort((a, b) => suits.indexOf(a.suit) - suits.indexOf(b.suit));
        }
        setDeck(sortedDeck);
    }

    return (
        <div className="card-deck">
            <div className="card-buttons">
                <button className="button" onClick={shuffleDeck}>Shuffle</button>
                <button className="button" onClick={() => sortDeck('rank')}>Sort by Rank</button>
                <button className="button" onClick={() => sortDeck('suit')}>Sort by Suit</button>
                <button className="button" onClick={() => drawCard()}>Draw Card</button>
            </div>
            <div>
                {deck && deck.map((card, i) =>
                    <ErrorBoundary>
                        <img key={i} src={card.imgUrl} alt={card.suit} width="120" height="160" />
                    </ErrorBoundary>
                )}
            </div>
        </div>
    )
};
export default CardDeck;