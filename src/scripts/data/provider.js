const apiURL = "http://localhost:8088"
const applicationElement = document.querySelector(".giffygram")


const applicationState = {
    currentUser: {},
    feed: {
        chosenUser: null,
        displayFavorites: false,
        displayMessages: false
    }
}

export const fetchUsers = () => {
    return fetch(`${apiURL}/users`)
        .then(res => res.json())
        .then(data => {
            applicationState.users = data
        })
}

export const getUsers = () => applicationState.users.map(user => ({...user}))