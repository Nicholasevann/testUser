import axios from 'axios';

const getData = () => {
  return axios({
    method: 'get',
    url: 'https://dummyapi.io/data/v1/user',
    headers: {
      'app-id': '62c477f3d952010c9f48ef55',
    },
  }).then(function ({data}) {
    return data.data;
  });
};

export default getData;
