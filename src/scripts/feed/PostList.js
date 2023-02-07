import { getFavorites, getPosts, getUsers, sendFavorite, deleteFave } from "../data/provider.js";
import { PostEntry } from "./PostEntry.js";
import { MessageForm } from "../message/MessageForm.js";

export const PostList = () => {
    const posts = getPosts()
    const favorites = getFavorites()
    const currentUser = parseInt(localStorage.getItem("gg_user"))

    const matchPostToUser = (post) => {
    const users = getUsers()
    const matchedUser = users.find(user => user.id === post.userId) 
    return `<a class="filterPostByUser" id="userfilter--${matchedUser.id}">${matchedUser.name}</a>`
}


const changeFavoriteColor = (post) => {
        const userFavorites = favorites.filter(favorite => favorite.userId === currentUser)
        if (userFavorites.find(userFave => userFave.postId === post.id)) {
            return 'src="../images/favorite-star-yellow.svg" class="yellow"'
        } else {
            return 'src="../images/favorite-star-blank.svg" class="blank"'
        }
    }

return `
${MessageForm()}
${PostEntry()}
<div class="postList">

${posts.map(post => {
    return `
    <div class="post" id="post--${post.id}">
    <h3>${post.title}</h3>
    <img src="${post.url}" alt="A gif" />
    <p>${post.story}</p>
    <p>Posted by ${matchPostToUser(post)} on ${post.date}<img ${changeFavoriteColor(post)} id="favorite--${post.id}"></p> 
    </div>`
}).join("")}
</div > `
}

export const postsByUser = (matchedUserId) => {
    const users = getUsers()
    const userPosts = posts.filter(post => post.userId === matchedUserId)
    const matchingUser = users.find(user => user.id === matchedUserId)
    return `
    <div class="postByUserList">

    ${userPosts.map(post => {
        return `
        <div class="post" id="post--${post.id}">
            <h3>${post.title}</h3>
            <img src="${post.url}" alt="A gif" />
            <p>${post.story}</p>
            <p>Posted by ${matchingUser.name} on ${post.date}</p> 
        </div>`
    }).join("")}

    </div > `
}

addEventListener("click", clickEvent => {
    if (clickEvent.target.className === "filterPostByUser") {
        const [,userId] = clickEvent.target.id.split("--")
        postsByUser(parseInt(userId))
        //dispatchEvent "filteredPosts"
    }
})

addEventListener(
    "click", clickEvent => {
        if (clickEvent.target.className === "blank") {
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
        if (clickEvent.target.className === "yellow") {
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