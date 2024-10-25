
let baseurl = 'https://deckofcardsapi.com/api/deck';

// 1.
axios.get(`${baseurl}/new/draw/`)
    .then(response => {
        let { suit, value } = response.data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    })
    .catch(err => console.log(err));

// 2. 
axios.get(`${baseurl}/new/draw/`)
    .then(response => {
        firstCard = response.data.cards[0];
        let deckId = response.data.deck_id;
        return axios.get(`${baseurl}/${deckId}/draw/`);
    })
    .then(response => {
        let secondCard = response.data.cards[0];
        [firstCard, secondCard].forEach(function(card) {
            console.log(
                `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
            );
        });
    });

// 3.
let deckId = null;
let $btn = document.querySelector('#drawbtn');
let $cardArea = document.querySelector('#card-area')

axios.get(`${baseurl}/new/shuffle/`).then(response => {
    deckId = response.data.deck_id;
    $btn.style.display = 'block';
    });

$btn.addEventListener('click', function() {
    axios.get(`${baseurl}/${deckId}/draw/`).then(response => {
        let cardSrc = response.data.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        let img = document.createElement('img');

        img.src = cardSrc;
        img.style.position = 'absolute';
        img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;
        document.getElementById('cardArea').appendChild(img);
        if (response.data.remaining === 0) $btn.style.display = 'none';
    });
});

