const endpoint = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const request = await fetch(endpoint);
  const data = await request.json();
  const { token } = data;
  return token;
};

export default getToken;
