import React, { useEffect } from 'react';
import { Spin } from 'antd';
import styles from '../index.less';

import TableKategori from './TableKategori';
import TableSubKategori from './TableSubKategori';
import TableTotal from './TableTotal';
import TableProduk from './TableProduk';

import useFetch from '@/hooks/useFetch';

// import PageLoading from '@/components/PageLoading';

interface Props {}

const PenjualanDetailComponent: React.FC<Props> = () => {
  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(`${REACT_APP_ENV}/merchant/details`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {status_list !== 200 || error_list ? <p>Merchant Tidak Ada</p> : null}
      {Boolean(loading_list) ? <Spin /> : <p className={styles.title}>{data_list.name}</p>}
      <TableTotal name={data_list.name} />
      <TableKategori name={data_list.name} />
      <TableSubKategori name={data_list.name} />
      <TableProduk name={data_list.name} />
    </div>
  );
};

export default PenjualanDetailComponent;
