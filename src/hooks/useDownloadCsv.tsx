import { useState } from 'react';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async ({ url, file }: { url: string; file: string }) => {
    setLoading(true);
    try {
      const posting = await axios({
        method: 'get',
        baseURL: url,
        responseType: 'blob',
        headers: { 'content-type': 'application/json' },
        withCredentials: true,
      });
      const blob = await posting.data;
      const result = new Blob([blob]);
      let elm = window.document.createElement('a');
      elm.href = window.URL.createObjectURL(result);
      elm.download = `${file}.csv`;
      document.body.appendChild(elm);
      elm.click();
      document.body.removeChild(elm);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return [loading, handleDownload];
}

export default App;
