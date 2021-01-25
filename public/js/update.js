const updatePostButton = document.querySelector('#update-post');

const updatePostFormHandler = async (event) => {
    // event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    // FIXME: This is not a good way to see what the post_id is.
    const post_id = document.location.href.substring(document.location.href.length -1);

    if (content) {
        // fetch is causing issues.
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                content
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        

        if (response.ok) {
            window.location.reload();
        } else {
            alert('Failed to update post.');
        }
    }
    else
    {
        console.log('Post must have a message.');
    }
};

const showUpdatePost = () => {
    const postDiv = document.querySelector('#update-post-details');
    const postClassList = postDiv.classList.value;

    if(postClassList.includes('hidden'))
    {
        postDiv.classList.remove('hidden');
        updatePostButton.classList.add('hidden');
    }
    else
    {
        postDiv.classList.add('hidden');
    }
};


document
.querySelector('.post-form')
.addEventListener('submit', updatePostFormHandler);

updatePostButton.addEventListener('click', showUpdatePost);