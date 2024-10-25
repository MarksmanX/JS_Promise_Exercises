
document.querySelector('button').addEventListener('click', (evt) => {
    evt.preventDefault();
    get4NumberFacts();
})
let numberFactPromises = [];

// 1.
axios.get('http://numbersapi.com/6?json').then(res => {
    console.log(res.data);
})

// 2. 
let numbers = [2, 17, 73];
axios.get(`http://numbersapi.com/${numbers}?json`).then(res => {
    console.log(res.data);
})

// 3.
function get4NumberFacts() {
    numberFactPromises = [];
    document.getElementById('fact-container').innerHTML = '';
    for (let i = 0; i < 4; i++) {
        numberFactPromises.push(
        axios.get('http://numbersapi.com/37?json')
        );
    }
    Promise.all(numberFactPromises)
        .then(numberFactArr => {
            numberFactArr.forEach(response => {
                let factParagraph = document.createElement('p');
                factParagraph.textContent = response.data.text;
                document.getElementById('fact-container').appendChild(factParagraph);
            });
        })
        .catch(err => console.log(err));
}


