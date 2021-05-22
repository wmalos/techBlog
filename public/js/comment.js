const commentBtn = document.querySelector(".comment-button");
const postid = commentBtn.getAttribute("id");

const comment = document.querySelector(".comment").value.trim();

const newComment = async (event) => {
  event.preventDefault();

  if (comment) {
    const response = await fetch(`/api/comment`, {
      method: "POST",
      body: JSON.stringify({ comment, postid }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace("/post");
    } else {
      alert("Failed to create comment");
    }
  }
};
