const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

// weatherMessage.textContent = 'asefasef';

weatherForm.addEventListener('submit', (e) => { // e stands for event.
    e.preventDefault();

    const location = search.value; // value extracts the input value selected above.

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    // fetch() is Asynchronous request.  Fetch takes the .then() method rather than a callback function as a second argument.
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    }); 
});