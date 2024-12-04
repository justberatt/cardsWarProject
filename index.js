const newDeckButton = document.querySelector('#new-deck')
let deckID;

const getDeck = () => {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => {
        deckID = data.deck_id
        console.log(deckID)
    })
}

newDeckButton.addEventListener('click', getDeck)

document.getElementById('draw-cards').addEventListener('click', () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckID}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            data.cards.forEach(card => console.log(card.value + card.suit))
        })
})