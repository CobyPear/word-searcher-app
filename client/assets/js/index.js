const userName = document.getElementById('userName')
const submitUserBtn = document.getElementById('submitUserBtn')

const submitWordBtn = document.getElementById('submitWordBtn')
const wordInput = document.getElementById('wordInput')

const enterNameForm = document.getElementById('enterNameForm')
const wordSearchForm = document.getElementById('wordSearchForm')

// get and display all users
const displayAllUsers = async () => {
    const users = await API.getAllUsers()
    
    if (users) {
        console.log(users)
    }
    // do stuff with users here
    
}

const addUser = async (e) => {
    e.preventDefault()
    const name = await userName.value
    const response = await API.addUser({name: name})
    if (response && response?.token) {
        sessionStorage.setItem('token', response.token)
        sessionStorage.setItem('name', response.name)

        const row = document.createElement('div')
        row.className = 'row'
        const userGreeting = document.createElement('h2')
        userGreeting.textContent = `Hello ${response.name}! Enter a word below to learn more about it!`
        row.append(userGreeting)
        enterNameForm.appendChild(row)

        wordSearchForm.style = "display: block"
    }
}



window.addEventListener('load', displayAllUsers)

submitUserBtn.addEventListener('click', addUser)

// submitWordBtn.addEventListener('click', searchWord)