const userName = document.getElementById('userName')
const submitUserBtn = document.getElementById('submitUserBtn')

const submitWordBtn = document.getElementById('submitWordBtn')
const wordInput = document.getElementById('wordInput')

const enterNameForm = document.getElementById('enterNameForm')
const wordSearchForm = document.getElementById('wordSearchForm')

const allNames = document.getElementById('allNames')

const userWords = []
const userToken = sessionStorage.getItem('token') || ''

let displayUsers

const isExpired = token => {
    // if token is expired, return true, else return false.
    // create backend route to check if user is in the db and if their token is still valid.
}

const init = async() => {
    // const localWords = sessionStorage.getItem('words')
    // console.log(localWords)
    // if (localWords?.length) {
    //     localWords.forEach(word => userWords.push(word))
    //     sessionStorage.setItem('words', userWords)
    // }
    // display all users and their words
    displayUsers()
        // if user already has a token, show word search form
        // here we can run a validation on the user's name (make sure it's still in the DB) and check to see if the token is expired
    if (userToken && !isExpired(userToken)) {
        //do stuff 
    }

}

displayUsers = async() => {
    const users = await API.getAllUsers()

    allNames.innerHTML = ''

    const row = document.createElement('div')
    row.className = 'row'
    const ul = document.createElement('ul')
    ul.style = "list-style: none"

    if (users) {
        users.forEach(user => {
            const li = document.createElement('li')
            li.setAttribute('data-clicked', 'false')
            li.textContent = user.name

            li.addEventListener('click', () => {
                const clickCheck = li.getAttribute('data-clicked')
                if (clickCheck === 'false') {
                    li.setAttribute('data-clicked', 'true')
                    let string = ''
                    user.words.forEach(({ word }) => string += word + ' ')
                    li.textContent += ' ' + string
                    
                    let hideWords = () => {
                        li.textContent = user.name
                        li.setAttribute('data-clicked', 'false')
                    }
                    setTimeout(hideWords, 5000)
                }
            })
            ul.append(li)

        })
        row.append(ul)
        allNames.append(row)

    }

}

const addUser = async(e) => {
    e.preventDefault()
    const name = await userName.value
    const response = await API.addUser({ name: name })
    if (response && response.token) {
        sessionStorage.setItem('token', response.token)
        sessionStorage.setItem('name', response.name)

        const row = document.createElement('div')
        row.className = 'row'
        const userGreeting = document.createElement('h2')
        userGreeting.textContent = `Hello ${response.name}! Enter a word below to learn more about it!`
        row.append(userGreeting)
        enterNameForm.appendChild(row)

        displayUsers()
        wordSearchForm.style = "display: block"
    }
}

const searchWord = async(e) => {
    e.preventDefault()
    const token = sessionStorage.getItem('token')
    const word = wordInput.value
    userWords.push(word)
    console.log(userWords)
    sessionStorage.setItem('words', userWords)
    const name = sessionStorage.getItem('name')
    const response = await API.authSearchWord({ name: name, word: word }, token)
    console.log(response)
}


window.addEventListener('load', init)

submitUserBtn.addEventListener('click', addUser)

submitWordBtn.addEventListener('click', searchWord)