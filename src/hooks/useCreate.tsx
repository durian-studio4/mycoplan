import { useState } from 'react';
import request from 'umi-request';

function App() {
  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(Date.now());

  const handlePost = async (url: string, data: any, clearState: () => void) => {
    setLoading(true);
    try {
      const posting = await request.post(url, {
        data,
        headers: {
          'Content-Type': 'Aplication/json',
        },
      });
      const result = await posting;
      setLoading(false);
      setRerender(Date.now());
      clearState();
      return result;
    } catch (error) {
      console.log(error, 'error');
      console.log(error.response, 'error');
      setLoading(false);
    }
  };

  const handleUpdate = async (url: string, data: any) => {
    setLoading(true);
    try {
      const posting = await request.post(url, {
        data,
        headers: {
          'Content-Type': 'Aplication/json',
        },
      });
      const result = await posting;
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
      const posting = await request.delete(url, {
        headers: {
          'Content-Type': 'Aplication/json',
        },
      });
      const result = await posting;
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
