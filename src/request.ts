import axios from 'axios';
const JSON_PLACE_HOLDER = 'https://jsonplaceholder.typicode.com';
const RANDOM_USERS = 'https://randomuser.me/api/';
const RANDOM_IMG = 'https://picsum.photos/'


export const getData = async () => {
  try {
    const [postsResponse, imagesResponse,  randomUsersResponse] = await Promise.all([
      axios.get(`${JSON_PLACE_HOLDER}/posts/?_start=0&_limit=10`),
      axios.get(`${RANDOM_IMG}/v2/list?page=2&limit=11`),
      axios.get(`${RANDOM_USERS}/?results=10`),
    ]);

    return {
      posts: postsResponse.data,
      images: imagesResponse.data,
      randomUsers: randomUsersResponse.data,
    };
  } catch (err) {
    console.error('Error fetching data:', err);
    return {
      posts: [],
      images: [],
      randomUsers: []
    };
  }
};
