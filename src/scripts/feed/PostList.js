import { getFavorites, getPosts, getUsers, sendFavorite, deleteFave, setChosenUser, applicationState, deletePost } from "../data/provider.js";
import { PostEntry } from "./PostEntry.js";
import { MessageForm } from "../message/MessageForm.js";

export const PostList = () => {
    const users = getUsers()
    const posts = getPosts()
    const favorites = getFavorites()
    const currentUser = parseInt(localStorage.getItem("gg_user"))
    const chosenUserId = applicationState.chosenUser.userId
    const searchResult = applicationState.searchString
    const matchPostToUser = (post) => {
        const matchedUser = users.find(user => user.id === post.userId) 
        return `<a class="filterPostByUser fakeLink" id="userfilter--${matchedUser.id}">${matchedUser.name}</a>`
    }

    const displaySearchResults = () => {
        if (searchResult) {
            const searchMatches = posts.filter(post => post.title.toLowerCase().includes(searchResult))
            return searchMatches.map(match => {
                return `<li><a href="#post--${match.id}">${match.title}</a></li>`
            }).join("")
        } else {
            return ""
        }
    }

    const postsByUser = (matchedUserId) => {
        const userPosts = posts.filter(post => post.userId === matchedUserId)
        const matchingUser = users.find(user => user.id === matchedUserId)

        return `
        <div class="postByUserList">

        ${userPosts.map(post => {
            return `
            <div class="post" id="post--${post.id}">
                <h3>${post.title}</h3>
                <img src="${post.url}" alt="A gif" class="post__image" />
                <p>${post.story}</p>
                <p>Posted by ${matchingUser.name} on ${post.date}</p> 
            </div>`
        }).join("")}

        </div > `
    }

    const matchedUserFavorites = (id) => {
        const userFavorites = favorites.filter(favorite => favorite.userId === id)
        const currentUserObject = users.find(user => user.id === id)
        const matchedPostToFave = (userFave) => {
            const userFavePost = posts.find(post => post.id === userFave.postId)
            return `
            <div class="post" id="post--${userFavePost.id}">
                <h3>${userFavePost.title}</h3>
                <img src="${userFavePost.url}" alt="A gif" class="post__image"/>
                <p>${userFavePost.story}</p>
                <p>Posted by ${currentUserObject.name} on ${userFavePost.date}</p> 
            </div>`
        }
        return userFavorites.map(userFave => {
            return matchedPostToFave(userFave)
        }).join("")
    }

    const changeFavoriteColor = (post) => {
        const userFavorites = favorites.filter(favorite => favorite.userId === currentUser)
        if (userFavorites.find(userFave => userFave.postId === post.id)) {
            return 'src="../images/favorite-star-yellow.svg" class="yellow"'
        } else {
            return 'src="../images/favorite-star-blank.svg" class="blank"'
        }
    }

    const addTrashCan = (post) => {
        if (post.userId === currentUser) {
            return `<img alt="trashcan" src="../images/block.svg" class="actionIcon" id="blockPost--${post.id}" />`
        } else {
            return ""
        }
    }

    if (chosenUserId) {
        return postsByUser(chosenUserId)
    } else if (applicationState.checkedFavorites === true) {
        return matchedUserFavorites(currentUser)
    } else {
        return `
        <ul>${displaySearchResults()}</ul>
        <div class="postList">

        ${posts
            .sort((a, b) => {
                let dA = new Date(a.date)
                let dB = new Date(b.date)

                return dB - dA
            })
            .map(post => {
            return `
            <div class="post" id="post--${post.id}">
            <h3>${post.title}</h3>
            <img src="${post.url}" alt="A gif" class="post__image" />
            <p>${post.story}</p>
            <p>Posted by ${matchPostToUser(post)} on ${post.date}</p>
            <div class="post__actions"><img ${changeFavoriteColor(post)} id="favorite--${post.id}">${addTrashCan(post)}</div>
            </div>`
        }).join("")}
        </div > `}
}

/* return `
 ${chosenUserId ? postsByUser(chosenUserId) :

`<div class="postList">

${posts.map(post => {
    return `
    <div class="post" id="post--${post.id}">
    <h3>${post.title}</h3>
    <img src="${post.url}" alt="A gif" />
    <p>${post.story}</p>
    <p>Posted by ${matchPostToUser(post)} on ${post.date}<img ${changeFavoriteColor(post)} id="favorite--${post.id}"></p> 
    </div>`
}).join("")}
</div > `}`
} */

addEventListener("click", clickEvent => {
    if (clickEvent.target.className === "filterPostByUser") {
        const [,userId] = clickEvent.target.id.split("--")
        setChosenUser(parseInt(userId))
        dispatchEvent(new CustomEvent("stateChanged"))

        //also fire if on the bottom nav
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

addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("blockPost")) {
        const [, postId] = clickEvent.target.id.split("--")
        deletePost(postId)
        dispatchEvent(new CustomEvent("stateChanged"))
    }
})