export const API_ROOT = 'https://www.reddit.com';

export const searchForPosts = async (subreddit) => {
    const response = await fetch(`${API_ROOT}${subreddit}.json`);

    const jsonResponse = await response.json();
    console.log(jsonResponse.data.children);

    return jsonResponse.data.children.map((post) => post.data);
};

export const searchPreview = async (term) => {
    const response = await fetch(`${API_ROOT}/search.json?q=${term}&type=sr`);
    const jsonResponse = await response.json();
    console.log(jsonResponse.data.children);

    return jsonResponse.data.children.map((post) => post.data);
};