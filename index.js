const newDeckButton = document.querySelector('#new-deck')


const getDeck = () => {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => console.log(data))
}

newDeckButton.addEventListener('click', getDeck)