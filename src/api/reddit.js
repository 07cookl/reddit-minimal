export const API_ROOT = 'https://www.reddit.com';

export const getPopularPost = async () => {
    const response = await fetch(`${API_ROOT}/r/popular.json`);
    const jsonResponse = await response.json();

    return jsonResponse.data.children.map((post) => post.data);
};