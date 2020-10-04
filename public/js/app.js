
console.log("Client side js file loaded!");


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    msg1.textContent = ''
    msg2.textContent = 'Loading...'

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg2.textContent = data.error
                return
            }
            msg1.textContent = data.location
            msg2.textContent = data.forecast
        })
    })
})