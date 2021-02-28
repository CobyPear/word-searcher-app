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
                body: JSON.stringify(name)
            })
            const json = await res.json()

            return json
        } catch (error) {
            console.log(error)
            
        }
    }
}