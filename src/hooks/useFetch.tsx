import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

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
      if (err.response && err.response.data && err.response.data.message === 'Unauthenticated.') {
        history.push('/user/login');
      }
    }
  };

  return [data, status, loading, isError, handleFetch];
}

export default App;
