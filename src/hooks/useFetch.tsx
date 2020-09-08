import { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(200);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
      console.log(err);
      // setStatus(err.response.status);
      setIsError(true);
      setLoading(false);
    }
  };

  return [data, status, loading, isError, handleFetch];
}

export default App;
