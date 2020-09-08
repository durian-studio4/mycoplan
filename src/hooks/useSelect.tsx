import { useState, useEffect } from 'react';

function App(args: string) {
  const [angka, setAngka] = useState('');

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAngka(args);
    }, 100);
    return () => clearTimeout(timeOut);
  }, [args]);

  const handleChangeSelect = (value: any, option: any) => {
    setAngka(option.key);
  };

  const handleClearSelect = () => {
    setAngka(args);
  };

  return [angka, handleChangeSelect, handleClearSelect];
}

export default App;
