import { getPosts, getUsers, sendFavorite } from "../data/provider.js";
import { PostEntry } from "./PostEntry.js";


export const PostList = () => {
    const posts = getPosts()
    const matchPostToUser = (post) => {
    const users = getUsers()
    const matchedUser = users.find(user => user.id === post.userId) 
    return `${matchedUser.name}`
}


return `
${PostEntry()}
<div class="postList">

${posts.map(post => {
    return `<div class="post" id="post--${post.id}">
    <h3>${post.title}</h3>
    <img src="${post.url}" alt="A gif" />
    <p>${post.story}</p>
    <p>Posted by ${matchPostToUser(post)} on ${post.date}<img src="../images/favorite-star-blank.svg" id="favorite--${post.id}" class="fave"></p>   
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
            
            
            function changeStarColor() {
                console.log(clickEvent.target.src)
                clickEvent.target.src = "../images/favorite-star-yellow.svg"
                }
                    
            changeStarColor()
            // change color based on json fetch return if favorite
                    
                    // const toggleImg = () => {
                        //     const blank = "../images/favorite-star-blank.svg"
                        //     const yellow = "../images/favorite-star-yellow.svg"
                        
                        //     const imgElement = clickEvent
                        //     imgElement.src = (imgElement.src === blank)? yellow : blank
                        // }
                        // toggleImg()
                        //            clickEvent.target.src = "../images/favorite-star-yellow.svg"
                        
            dispatchEvent(new CustomEvent("stateChanged"))
                    
            
        }
    }

)