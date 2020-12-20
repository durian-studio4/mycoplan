import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

message.config({
  top: 100,
  duration: 2,
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

      if (result.data_error && result.data_error.length) {
        console.log(result.data_error);
        const data = result.data_error;
        let data_message = data.map((item) =>
          message.error(
            `${item.name} tidak dapat di upload, periksa kembali data yang anda masukan`,
          ),
        );
        return data_message;
      }

      message.success('success');
      window.location.reload(false);
      return result;
    } catch (error) {
      if (error.response) {
        message.error(error.response?.data?.message);
      }
      setLoading(false);
    }
  };

  return [file_img, loading, onChangeImage, onRemoveImage, onHandlePost];
}

export default App;
