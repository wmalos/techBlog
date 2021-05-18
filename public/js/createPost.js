const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#post-title").value.trim();
  const postContent = document.querySelector("#post-content").value.trim();

  if (name && postContent) {
    const response = await fetch(`/api/post`, {
      method: "POST",
      body: JSON.stringify({ name, postContent }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete project");
    }
  }
};

document.querySelector(".new-post").addEventListener("submit", newFormHandler);

document
  .querySelector(".post-list")
  .addEventListener("click", delButtonHandler);
