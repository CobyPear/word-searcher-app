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
    authSearchWord: async function(body, token) {
        console.log(body)
        try {
            const res = await fetch('/api/word', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const json = await res.json()

            return json
        } catch (error) {
            console.log(error)
        }
    }
}