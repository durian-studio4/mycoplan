import { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [values, setValues] = useState('');
  const [id, setId] = useState(0);

  const changeText = (value: any) => {
    setText(value);
  };

  const selectText = (value: any, e: any) => {
    setText(e.children);
    setId(value);
    setValues(e.children);
  };

  const clearText = () => {
    setText('');
  };

  return { text, id, values, changeText, selectText, clearText };
}

export default App;
