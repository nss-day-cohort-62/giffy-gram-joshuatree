import { applicationState, getPosts, setSearch } from "../data/provider.js"

export const NavBar = () => {
    const posts = getPosts()
    return `
    <button id="btn__logout">Logout</button>
    <button id="createMessage">Create Message</button>
    <button id="loadMessages">Messages</button>
    <button id="homeButton">Home</button>
    <div class="formS">
        <form class="FIND">
            <input type="text" id="search" placeholder="search..." />
            <button type="button" id="btn__submitSearch" class="submit-results">submit</button> 
            <button type="button" id="clear" class="clear-results">clear</button>
        </form>
    </div>`
}

 

// if you want a button to do something other than "submit" always do type="button"
addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "btn__submitSearch") {
        const searchQuery = document.querySelector("#search").value.toLowerCase()
        setSearch(searchQuery)
        dispatchEvent(new CustomEvent("stateChanged"))
    }
})

addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "clear") {
        dispatchEvent(new CustomEvent("stateChanged"))
    }
})

addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "btn__logout") {
        localStorage.removeItem("gg_user")
        dispatchEvent(new CustomEvent("stateChanged"))
    }
})

addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "loadMessages") {
        dispatchEvent(new CustomEvent("loadMessages"))
    }
})

addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "homeButton") {
        applicationState.chosenUser = {}
        applicationState.checkedFavorites = false
        dispatchEvent(new CustomEvent("goHome"))
    }
})