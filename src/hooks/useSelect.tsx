import { useState } from 'react';

function App(args: string) {
  const [angka, setAngka] = useState(args);

  const handleChangeSelect = (value: any, option: any) => {
    setAngka(option.key);
  };

  const handleClearSelect = () => {
    setAngka(args);
  };

  return [angka, handleChangeSelect, handleClearSelect];
}

export default App;
