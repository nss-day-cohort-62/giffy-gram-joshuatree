import { getUsers, setChosenUser, setCheckedFavorites, setYear, applicationState, getPosts } from "../data/provider.js"

export const Footer = () => {
    const users = getUsers()
    const posts = getPosts()
    const currentUser = parseInt(localStorage.getItem("gg_user"))
    const selectedYear = applicationState.chosenYear
    const isYearSelected = (year) => {
        if (selectedYear === year) {
            return 'selected'
        } else {
            return ""
        }
    }
    const chosenUserId = applicationState.chosenUser.userId
    const isSelected = (id) => {
        if (chosenUserId === id) {
            return `selected`
        } else {
            return ''
        }
    }
    //Hates it but it works
    
    const getPostsByDate = (userId) => {
        const posts = getPosts()
        const postsByUser = posts.filter(post => post.userId === userId)
        
        const userPostsByYearArray = postsByUser.map(userPost => {
            const [,,postYear] = userPost.date.split("/")
            return parseInt(postYear)
        })

        const userPostsofAllTime = userPostsByYearArray.length
        const userPostsof2022 = userPostsByYearArray.filter(postYear => postYear >= 2022)
        const userPostsof2023 = userPostsByYearArray.filter(postYear => postYear === 2023)

        if (selectedYear === 2021) {
            return userPostsofAllTime
        } else if (selectedYear === 2022) {
            return userPostsof2022.length
        } else if (selectedYear === 2023 ) {
            return userPostsof2023.length
        } else {
            return ""
        }
    
    }
const isChecked = () => {
    if (applicationState.checkedFavorites === true) {
        return "checked class='checked'"
    } else {
        return 'class="empty"'
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
            <option ${isYearSelected(2021)} value="2021">2021</option>
            <option ${isYearSelected(2022)} value="2022">2022</option>
            <option ${isYearSelected(2023)} value="2023">2023</option>
        </select>
    </div>
    <div id="postsByUserDate">${getPostsByDate(chosenUserId)}</div>
    <div>Show only favorites <input type="checkbox" id="showFavorites" value="${currentUser}" ${isChecked()}/></div>
</div>`   
}

addEventListener("change", event => {
    if (event.target.id === "timeSincePost") {
        const yearId = document.querySelector("#timeSincePost").value
        setYear(parseInt(yearId))
        dispatchEvent(new CustomEvent("stateChanged")) 
    }
})

addEventListener("change", event => {
    if (event.target.id === "footerUser") {
        const userId = document.querySelector("#footerUser").value
        setChosenUser(parseInt(userId))
        dispatchEvent(new CustomEvent("stateChanged"))

    }
})

addEventListener("change", event => {
    if (event.target.id === "showFavorites") {
        if (event.target.className === "empty") {
            setCheckedFavorites()
        } else { 
            applicationState.checkedFavorites = false
        }
        dispatchEvent(new CustomEvent("stateChanged"))
    }
})
