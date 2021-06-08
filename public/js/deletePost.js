const post_id = document.querySelector('input[name="post_id"]');

// const editFormHandler = async function(event) {
//   event.preventDefault();

//   const title = document.querySelector('input[name="post-title"]').value;
//   const body = document.querySelector('textarea[name="post-body"]').value;

//   await fetch(`/api/post/${post_id}`, {
//     method: 'PUT',
//     body: JSON.stringify({
//       title,
//       body
//     }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

//   document.location.replace('/dashboard');
// };

const delButtonHandler = async function () {
  await fetch(`/api/posts/${post_id}`, {
    method: "DELETE",
  });

  document.location.replace("/dashboard");
};

// document
//   .querySelector('#edit-post-form')
//   .addEventListener('submit', editFormHandler);
document
  .querySelector("#delete-button")
  .addEventListener("click", delButtonHandler);
