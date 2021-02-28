const userName = document.getElementById('userName')
const submitUserBtn = document.getElementById('submitUserBtn')

const submitWordBtn = document.getElementById('submitWordBtn')
const wordInput = document.getElementById('wordInput')

// get and display all users
const displayAllUsers = async () => {
    const users = API.getAllUsers()
    
    if (users) {
        console.log(users)
    }
    // do stuff with users here
    
}

const addUser = (e) => {
    e.preventDefault()
    const response = API.addUser({name: userName.value})

    console.log(response)
}



window.addEventListener('load', displayAllUsers)

submitUserBtn.addEventListener('click', addUser)