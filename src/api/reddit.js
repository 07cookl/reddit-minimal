export const API_ROOT = 'https://www.reddit.com';

export const searchForPosts = async (subreddit) => {
    const response = await fetch(`${API_ROOT}/${subreddit}.json`);

    const jsonResponse = await response.json();
    // console.log(jsonResponse);

    return jsonResponse.data.children.map((post) => post.data);
};

export const searchPreview = async (term) => {
    const response = await fetch(`${API_ROOT}/search.json?q=${term}&type=sr`);
    const jsonResponse = await response.json();
    // console.log(jsonResponse.data.children);

    return jsonResponse.data.children.map((post) => post.data);
};

export const subredditInfo = async (subreddit) => {
    const response = await fetch(`${API_ROOT}/${subreddit}/about.json`);

    const jsonResponse = await response.json();
    // console.log(jsonResponse);

    return jsonResponse.data;
};

export const postComments = async (permalink) => {
    const response = await fetch(`${API_ROOT}${permalink}.json`);

    const jsonResponse = await response.json();
    // console.log(jsonResponse);

    return jsonResponse[1].data.children.map((comment) => (comment.data));
};