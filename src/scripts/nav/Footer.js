import { getUsers, getFavorites, setChosenUser } from "../data/provider.js"

export const Footer = () => {
const users = getUsers()
const favorites = getFavorites()
const currentUser = parseInt(localStorage.getItem("gg_user"))

return `
<div> <label for="postsByUser">Posts by user</label>
<select id="footerUser">
    <option value="0" >Choose...</option>
${users.map(user => {
    return `<option class="filterPostByUser" value="${user.id}">${user.name}</option>`
})}
</select></div>

<div>Show only favorites <input type="checkbox" id="showFavorites" value="${currentUser}"/> `   
}


addEventListener("change", event => {
    if (event.target.id === "footerUser") {
        const userId = document.querySelector("#footerUser").value
        setChosenUser(parseInt(userId))
        dispatchEvent(new CustomEvent("stateChanged"))

    }
})


addEventListener("change", event => {
    if (event.target.id === "showFavorites") {
        const currentUserId = parseInt(document.querySelector("input[type='checkbox']:checked").value)
        matchedUserFavorites(currentUserId)
    }
})