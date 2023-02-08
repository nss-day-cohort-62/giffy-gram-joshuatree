import { applicationState } from "../data/provider.js"

export const NavBar = () => {
    return `
    <button id="btn__logout">Logout</button>
    <button id="createMessage">Create Message</button>
    <button id="loadMessages">Messages</button>
    <button id="homeButton">Home</button>`
}

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