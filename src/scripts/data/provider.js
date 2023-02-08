const apiURL = "http://localhost:8088"
const applicationElement = document.querySelector(".giffygram")


export const applicationState = {
    currentUser: {},
    chosenUser: {},
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

export const sendFavorite = (newFavorite) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newFavorite)
    }

    return fetch(`${apiURL}/favorites`, fetchOptions)
    .then(res => res.json())
    .then(() => {
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
    })
}

export const fetchFavorites = () => {
    return fetch(`${apiURL}/favorites`)
    .then(res => res.json())
    .then(data =>{
        applicationState.favorites = data
    })
}

export const getFavorites = () => {
    return applicationState.favorites.map(favorite => ({...favorite}))
}

export const deleteFave = (fave) => {
    return fetch (`${apiURL}/favorites/${fave}
    `, {method: "DELETE"})
    .then(
        () => {

            document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
        }
    )
}

export const fetchMessages = () => {
    return fetch(`${apiURL}/messages`)
        .then(res => res.json())
        .then(data => {
            applicationState.messages = data
        })
}

export const getMessages = () => applicationState.messages.map(message => ({...message}))

export const sendMessages = (newMessage) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMessage)
    }

    return fetch(`${apiURL}/messages`, fetchOptions)
        .then(res => res.json())
        .then(() => document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged")))
}

export const setChosenUser = (id) => {
    applicationState.chosenUser.userId = id
}

export const matchedUserFavorites = (id) => {
    const favorites = getFavorites()
    const posts = getPosts()
    const userFavorites = favorites.filter(favorite => favorite.userId === id)
    const matchedPostToFave = (userFave) => {
        const userFavePost = posts.find(post => post.id === userFave.postId)
        return userFavePost
    }
    return `${userFavorites.map(userFave => {
        return `${matchedPostToFave(userFave)}`
    })}
    `
}