let deckID;
const drawCardsBtn = document.getElementById('draw-cards')
const newDeckBtn = document.querySelector('#new-deck')
const cardsContainer = document.querySelector('#cards-container')

const getDeck = () => {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => {
        deckID = data.deck_id
    })
}

const drawCards = () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckID}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data.cards)
            cardsContainer.children[0].innerHTML = `
                <img src="${data.cards[0].image}"></img>
            `
            cardsContainer.children[1].innerHTML = `
                <img src="${data.cards[1].image}"></img>
            `
            getTheHighest(data.cards[0], data.cards[1])
        })
}

const getTheHighest = (card1, card2) => {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
        "10", "JACK", "QUEEN", "KING", "ACE"]
        const card1Value = valueOptions.indexOf(card1.value)
        const card2Value = valueOptions.indexOf(card2.value)
    
        parseInt(card1Value) > parseInt(card2Value)
        ? console.log(valueOptions[card1Value])
        : parseInt(card1Value) < parseInt(card2Value)
            ? console.log(valueOptions[card2Value])
            : console.log("draw");
    
}

newDeckBtn.addEventListener('click', getDeck)
drawCardsBtn.addEventListener('click', drawCards)