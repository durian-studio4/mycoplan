import { useState } from 'react';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

message.config({
  top: 100,
  duration: 2,
  maxCount: 1,
});

function App() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(200);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const history = useHistory();

  const handleFetch = async (url: string) => {
    setLoading(true);
    try {
      const fetching = await axios.get(url, {
        withCredentials: true,
      });
      const result = await fetching.data;
      setStatus(200);
      setData(result.data);
      setLoading(false);
      return result;
    } catch (err) {
      setIsError(true);
      setLoading(false);
      console.log(err.response);
      if (err.response && err.response.data && err.response.data.message === 'Unauthenticated.') {
        message.warning('Sesi Telah Habis');
        history.push('/user/login');
      }

      if (err.response.data.message) {
        message.warning(err.response.data.message);
      }
    }
  };

  return [data, status, loading, isError, handleFetch];
}

export default App;
