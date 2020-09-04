import { useState } from 'react';
import { format } from 'date-fns';

function App(number: string) {
  const [angka, setAngka] = useState(number);

  const handleChangeDate = (date: number | Date) => {
    setAngka(format(date, 'yyyy-MM-dd'));
  };

  const handleClearDate = () => {
    setAngka(number);
  };

  return [angka, handleChangeDate, handleClearDate];
}

export default App;
