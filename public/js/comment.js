const commentBtn = document.querySelector(".comment-button");
const post_id = commentBtn.getAttribute("id");

const comment = document.getElementById("comment");
let comment_body = comment.value;

const newComment = async (event) => {
  event.preventDefault();
  console.log("fetch route");
  console.log(comment_body);
  if (comment_body) {
    console.log("if statement");
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ comment_body, post_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/post");
    } else {
      alert("Failed to create comment");
    }
  }
};

commentBtn.addEventListener("click", newComment);