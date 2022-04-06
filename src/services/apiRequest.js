const endpoint = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const request = await fetch(endpoint);
  const data = await request.json();
  const { token } = data;
  return token;
};
const num = 3;

export const getTrivia = async (token2) => {
  const endpoint2 = `https://opentdb.com/api.php?amount=5&token=${token2}`;
  const request = await fetch(endpoint2);
  const data = await request.json();
  if (data.response_code === num) {
    const novoToken = await getToken();
    const novoEndpoint = `https://opentdb.com/api.php?amount=5&token=${novoToken}`;
    const request2 = await fetch(novoEndpoint);
    const data2 = await request2.json();
    return data2;
  }
  return data;
};

export default getToken;
