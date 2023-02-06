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

export const sendNewUser = (newUser) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    }

    return fetch(`${apiURL}/users`, fetchOptions)
        .then(res => res.json())
        .then(() => {
            document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const fetchPosts = () => {
    return fetch(`${apiURL}/posts`)
    .then(res => res.json())
    .then(data => {
        applicationState.posts = data
    })
}

export const getPosts = () => {
    return applicationState.posts.map(post => ({...post}))
}

export const sendPost = (newPost) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
    }

    return fetch(`${apiURL}/posts`, fetchOptions)
        .then(res => res.json())
        .then(() => {
            document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
        })
}