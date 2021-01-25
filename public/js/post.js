const postFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const newPostButton = document.querySelector('#new-post');

    if (content) {
        // fetch is causing issues.
        const response = await fetch(`/api/posts/`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                content
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        

        if (response.ok) {
            document.location.replace(`/dashboard`);
        } else {
            alert('Failed to post.');
        }
    }
    else
    {
        console.log('Post must have a message.');
    }
};

const showNewPost = () => {
    const postDiv = document.querySelector('#new-post-details');
    const postClassList = postDiv.classList.value;

    const newPostButton = document.querySelector('#new-post');

    if(postClassList.includes('hidden'))
    {
        postDiv.classList.remove('hidden');
        newPostButton.classList.add('hidden');
    }
    else
    {
        postDiv.classList.add('hidden');
    }
};


document
.querySelector('.post-form')
.addEventListener('submit', postFormHandler);

document.querySelector('#new-post').addEventListener('click', showNewPost);