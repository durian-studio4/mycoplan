import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { WindowsFilled } from '@ant-design/icons';

message.config({
  top: 100,
  duration: 2,
  maxCount: 1,
});

function App() {
  const [file_img, setFileImg] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChangeImage = (file: any) => {
    setFileImg((state) => [...state, file]);
    return false;
  };

  const onRemoveImage = (e: any) => {
    setFileImg([]);
  };
  const onHandlePost = async ({ url, data }: { url: string; data: any }) => {
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
      message.success('success');
      window.location.reload(false);
      return result;
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message);
      }
      setLoading(false);
    }
  };

  return [file_img, loading, onChangeImage, onRemoveImage, onHandlePost];
}

export default App;
