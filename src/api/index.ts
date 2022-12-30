import axios from "axios";

interface IData {
  text: string;
  source: string;
  media?: string[];
}

export interface IResponseData {
  data: IData[];
  max_id: number;
}

const twitterAPI = (
  screen_name: string,
  min_impression: string,
  max_id?: string
) => {
  let endpoint = `${process.env.REACT_APP_API_ENDPOINT_URL}/fav?name=${screen_name}&min_impression=${min_impression}&maxid=${max_id}`;
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { twitterAPI };
