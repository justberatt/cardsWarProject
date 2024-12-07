let deckID;
let computerScore = 0
let myScore = 0
let result = ''
const drawCardsBtn = document.getElementById('draw-cards')
const newDeckBtn = document.querySelector('#new-deck')
const card1 = document.querySelector('#card1')
const card2 = document.querySelector('#card2')
const winnerText = document.querySelector('#winner-text')
const remainingCardsText = document.getElementById("remaining-cards")
const yourScoreHolder = document.querySelector("#your-score")
const computerScoreHolder = document.querySelector("#computer-score")

const getDeck = () => {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => {
        remainingCardsText.textContent = `Cards remaining: ${data.remaining}`
        deckID = data.deck_id
    })
}

const drawCards = () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckID}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            remainingCardsText.textContent = `Cards remaining: ${data.remaining}`
            if (data.remaining === 0) {
                drawCardsBtn.disabled = true
            }

            card1.innerHTML = `
                <img src="${data.cards[0].image}"></img>
            `
            card2.innerHTML = `
                <img src="${data.cards[1].image}"></img>
            `
            winnerText.textContent = getTheHighest(data.cards[0], data.cards[1])
        })
}

const getTheHighest = (card1, card2) => {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
        "10", "JACK", "QUEEN", "KING", "ACE"]
        const card1Value = valueOptions.indexOf(card1.value)
        const card2Value = valueOptions.indexOf(card2.value)
    
        if (card1Value > card2Value) {
            computerScore++
            result = "Computer Wins!"
        } else if (card1Value < card2Value) {
            myScore++
            result = "You win!"
        } else {
            result = "War!"
        }
        yourScoreHolder.textContent = `You: ${myScore}`
        computerScoreHolder.textContent = `Computer: ${computerScore}`
        return result
}

newDeckBtn.addEventListener('click', getDeck)
drawCardsBtn.addEventListener('click', drawCards)