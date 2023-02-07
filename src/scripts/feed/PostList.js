import { getFavorites, getPosts, getUsers, sendFavorite, deleteFave } from "../data/provider.js";
import { PostEntry } from "./PostEntry.js";


export const PostList = () => {
    const posts = getPosts()
    const favorites = getFavorites()
    const currentUser = parseInt(localStorage.getItem("gg_user"))

    const matchPostToUser = (post) => {
    const users = getUsers()
    const matchedUser = users.find(user => user.id === post.userId) 
    return `${matchedUser.name}`
}


const changeFavoriteColor = (post) => {
        const userFavorites = favorites.filter(favorite => favorite.userId === currentUser)
        if (userFavorites.find(userFave => userFave.postId === post.id)) {
            return "../images/favorite-star-yellow.svg"
        } else {
            return "../images/favorite-star-blank.svg"
        }
    }

return `
${PostEntry()}
<div class="postList">

${posts.map(post => {
    return `
    <div class="post" id="post--${post.id}">
    <h3>${post.title}</h3>
    <img src="${post.url}" alt="A gif" />
    <p>${post.story}</p>
    <p>Posted by ${matchPostToUser(post)} on ${post.date}<img src=${changeFavoriteColor(post)} id="favorite--${post.id}" class="fave"></p> 
    </div>`
}).join("")}
</div > `
}

addEventListener(
    "click", clickEvent => {
        if (clickEvent.target.src.includes("blank")) {
            const [, postFaveId] = clickEvent.target.id.split("--")
            const userFave = parseInt(localStorage.getItem("gg_user"))

            
            const favoriteToSendToAPI = {
                userId: userFave,
                postId: parseInt(postFaveId)
            }
            
            sendFavorite(favoriteToSendToAPI)
                        
            dispatchEvent(new CustomEvent("stateChanged"))
                    
            
        }
    }

)

addEventListener(
    "click", clickEvent => {
        if (clickEvent.target.src.includes("yellow")) {
            const favorites = getFavorites()
            const [, postFaveId] = clickEvent.target.id.split("--")
            const userFave = parseInt(localStorage.getItem("gg_user"))
            const matchedFave = favorites.find(favorite => {
               if (parseInt(postFaveId) === favorite.postId && userFave === favorite.userId) {
                return favorite
               }
            })
            

            deleteFave(matchedFave.id)
            dispatchEvent(new CustomEvent("stateChanged"))


            
        }
    }
)