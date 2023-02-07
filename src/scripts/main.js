import { GiffyGram } from "./GiffyGram.js"
import { LoginForm } from "./auth/Login.js"
import { fetchFavorites, fetchPosts, fetchUsers } from "./data/provider.js"

const applicationElement = document.querySelector(".giffygram")

async function renderApp() {
    await Promise.all([
        fetchUsers(), 
        fetchPosts(),
        fetchFavorites()
    ])
    const user = parseInt(localStorage.getItem("gg_user"))

    if (user) {
        applicationElement.innerHTML = GiffyGram()
    } else {
        applicationElement.innerHTML = LoginForm()
    }
}

renderApp()

addEventListener("stateChanged", () => {
    renderApp()
})