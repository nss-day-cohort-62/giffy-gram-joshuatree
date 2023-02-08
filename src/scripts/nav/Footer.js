import { getUsers, setChosenUser, setCheckedFavorites, applicationState, getPosts } from "../data/provider.js"

export const Footer = () => {
const users = getUsers()
const posts = getPosts()
const currentUser = parseInt(localStorage.getItem("gg_user"))
const chosenUserId = applicationState.chosenUser.userId
const isSelected = (id) => {
    if (chosenUserId === id) {
        return `selected`
    } else {
        return ''
    }
}
const isChecked = () => {
    if (applicationState.checkedFavorites === true) {
        return `checked`
    } else {
        return ''
    }
}
const displayYearFilter = () => {
    if (chosenUserId) {
        return "display:block"
    } else {
        return "display:none"
    }
}


return `
<div class="footer">
    <div>
        <label for="postsByUser">Posts by user</label>
        <select id="footerUser">
            <option value="0" >Choose...</option>
            ${users.map(user => {
                return `
                <option class="filterPostByUser" value="${user.id}" ${isSelected(user.id)}>${user.name}</option>`
            })}
        </select>
    </div>

    <div id="yearFilter" style=${displayYearFilter()}>
        <label for="postsByYear">Posts since</label>
        <select id="timeSincePost">
            <option value="0">Choose...</option>
            <option value="1">2021</option>
            <option value="2">2022</option>
            <option value="3">2023</option>
        </select>
    </div>

    <div>Show only favorites <input type="checkbox" id="showFavorites" value="${currentUser}" ${isChecked()}/></div>
</div>`   
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
        console.log("this is firing")
        setCheckedFavorites()
        dispatchEvent(new CustomEvent("stateChanged"))
    } /* else if (event.target.class === "checked") {
        console.log("this is also firing")
        applicationState.checkedFavorites = false
        dispatchEvent(new CustomEvent("stateChanged"))
    } */
})