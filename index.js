
const button = document.getElementById("click")
button.addEventListener('click', GetJSON)

const text = document.getElementById("text")


async function GetJSON() {
    const response = await fetch('http://127.0.0.1:5000/commands')
    const data = await response.json()
    console.log(data)

}

