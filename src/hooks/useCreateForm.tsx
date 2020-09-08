import { useState } from 'react';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(Date.now());

  const handlePost = async (url: string, data: any, clearState: () => void) => {
    setLoading(true);
    try {
      const posting = await axios({
        method: 'post',
        baseURL: url,
        data,
        headers: { 'Content-Type': 'multipart/form-data', Accept: 'application/json' },
        withCredentials: true,
      });
      const result = await posting.data;
      setLoading(false);
      setRerender(Date.now());
      clearState();
      return result;
    } catch (error) {
      console.log(error.response, 'error');
      setLoading(false);
    }
  };

  const handleUpdate = async (url: string, data: any) => {
    setLoading(true);
    try {
      const posting = await axios({
        method: 'put',
        baseURL: url,
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      const result = await posting.data;
      setLoading(false);
      setRerender(Date.now());
      return result;
    } catch (error) {
      console.log(error, 'error');
      console.log(error.response, 'error');
      setLoading(false);
    }
  };

  const handleDelete = async (url: string) => {
    setLoading(true);
    try {
      const posting = await axios({
        method: 'delete',
        baseURL: url,
        withCredentials: true,
      });
      const result = await posting.data;
      setLoading(false);
      setRerender(Date.now());
      return result;
    } catch (error) {
      console.log(error, 'error');
      console.log(error.response, 'error');
      setLoading(false);
    }
  };

  return [loading, rerender, handlePost, handleUpdate, handleDelete];
}

export default App;
