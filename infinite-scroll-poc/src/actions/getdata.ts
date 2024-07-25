export const getUsers = async (offset: number, limit: number) => {
  try {
    const url = `https://dummyjson.com/users?offset=${offset}&limit=${limit}`;
    const response = await fetch(url);
    const result = await response.json();
    return result.users;
  } catch (error: unknown) {
    console.log(error);
    throw new Error(`An error happened: ${error}`);
  }
};
