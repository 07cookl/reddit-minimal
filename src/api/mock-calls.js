const API_ROOT = 'https://www.reddit.com';

const searchForPosts = async (subreddit) => {
    const response = await fetch(`${API_ROOT}/${subreddit}.json`);

    const jsonResponse = await response.json();
    console.log(jsonResponse.data.children);

    return jsonResponse;
};

const searchPreview = async (term) => {
    const response = await fetch(`${API_ROOT}/search.json?q=${term}&type=sr`);
    const jsonResponse = await response.json();
    console.log(jsonResponse.data.children);

    return jsonResponse.data.children.map((post) => post.data);
};

const subredditInfo = async (subreddit) => {
    const response = await fetch(`${API_ROOT}/${subreddit}/about.json`);

    const jsonResponse = await response.json();
    console.log(jsonResponse);

    return jsonResponse.data;
};

const postComments = async (post) => {
    const response = await fetch(`${API_ROOT}${post.permalink}.json`);

    const jsonResponse = await response.json();
    console.log(jsonResponse.data.children);

    return jsonResponse[1].data.children.map((comment) => (comment.data));
};

