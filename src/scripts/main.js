import { GiffyGram } from "./GiffyGram.js"
import { LoginForm } from "./auth/Login.js"
import { MessageList } from "./friends/DirectMessage.js"
import { fetchFavorites, fetchMessages, fetchPosts, fetchUsers } from "./data/provider.js"

const applicationElement = document.querySelector(".giffygram")

async function renderApp() {
    await Promise.all([
        fetchUsers(), 
        fetchPosts(),
        fetchFavorites(),
        fetchMessages()
    ])
    const user = parseInt(localStorage.getItem("gg_user"))

    if (user) {
        applicationElement.innerHTML = GiffyGram()
        addEventListener("loadMessages", () => {
            applicationElement.innerHTML = MessageList()
        })
        addEventListener("goHome", () => {
            applicationElement.innerHTML = GiffyGram()
        })
    } else {
        applicationElement.innerHTML = LoginForm()
    }
}

renderApp()

addEventListener("stateChanged", () => {
    renderApp()
})