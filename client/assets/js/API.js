const API = {
    getAllUsers: async function() {
        try {
            const res = await fetch('/api/user')
            const json = await res.json()

            return json

        } catch (error) {
            console.log(error)
        }
    },
    addUser: async function(name) {
        console.log(name)
        try {
            const res = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(name)
            })
            const json = await res.json()

            return json
        } catch (error) {
            console.log(error)
            
        }
    },
    authSearchWord: async function(word) {
        console.log(word)
        try {
            const res = await fetch('/api/word')
        } catch (error) {
            
        }
    }
}