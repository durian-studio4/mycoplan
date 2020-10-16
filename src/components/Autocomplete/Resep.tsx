import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AutoComplete, Spin } from 'antd';
import styles from './styles.less';

const Option = AutoComplete.Option;

interface Props {
  value: any;
  onSelect: (value: any, e: any) => void;
  onChange: (value: string) => void;
}

const AutoResepComponent: React.FC<Props> = ({ value, onSelect, onChange }) => {
  const [dataSource, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetching();
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetching = async () => {
    setLoading(true);
    try {
      const wait = await axios({
        method: 'get',
        baseURL: `${REACT_APP_ENV}/admin/recipes`,
        withCredentials: true,
      });
      const json = await wait.data;
      const result = await json.data;
      setLoading(false);
      setData(result);
    } catch (err) {
      console.log(err, 'error');
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div className={styles.auto_complete}>
      <AutoComplete
        style={{ width: '100%' }}
        value={value}
        filterOption={(inputValue, option) =>
          option.props.children.toLowerCase().includes(inputValue.toLowerCase())
        }
        onSelect={onSelect}
        onChange={onChange}
        placeholder="Mohon Pilih Resep"
      >
        {dataSource.map((data) => (
          <Option key={data.id} id={data.id} value={data.name}>
            {data.name}
          </Option>
        ))}
      </AutoComplete>
    </div>
  );
};

export default AutoResepComponent;
