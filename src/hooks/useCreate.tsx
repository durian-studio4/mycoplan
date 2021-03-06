import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

message.config({
  top: 100,
  duration: 2,
  maxCount: 1,
});

function App() {
  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(Date.now());

  const handlePost = async (url: string, data: any, clearState: () => void) => {
    setLoading(true);
    try {
      const posting = await axios({
        method: 'post',
        baseURL: url,
        headers: { 'content-type': 'application/json' },
        data,
        withCredentials: true,
      });
      const result = await posting.data;
      setLoading(false);
      setRerender(Date.now());
      clearState();
      message.success('success');
      return result;
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message);
      }
      setLoading(false);
    }
  };

  const handleUpdate = async (url: string, data: any) => {
    setLoading(true);
    try {
      const posting = await axios({
        method: 'put',
        baseURL: url,
        headers: { 'content-type': 'application/json' },
        data,
        withCredentials: true,
      });
      const result = await posting.data;
      setLoading(false);
      setRerender(Date.now());
      message.success('updated');
      return result;
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message);
      }
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
      message.success('deleted');
      return result;
    } catch (error) {
      console.log(error, 'error');
      console.log(error.response, 'error');
      if (error.response) {
        message.error(error.response.data.message);
      }
      setLoading(false);
    }
  };

  return [loading, rerender, handlePost, handleUpdate, handleDelete];
}

export default App;
