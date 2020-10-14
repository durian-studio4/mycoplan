import React, { useEffect } from 'react';
import { useParams } from 'umi';
import styles from '../index.less';

import TableKategori from './TableKategori';
import TableSubKategori from './TableSubKategori';
import TableTotal from './TableTotal';
import TableProduk from './TableProduk';

import useFetch from '@/hooks/useFetch';

import PageLoading from '@/components/PageLoading';

interface Props {}

const PenjualanDetailComponent: React.FC<Props> = () => {
  const { id } = useParams();

  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(`${REACT_APP_ENV}/admin/merchants/${id}`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      {status_list !== 200 || error_list ? <p>Merchant Tidak Ada</p> : null}
      {Boolean(loading_list) ? <PageLoading /> : <p className={styles.title}>{data_list.name}</p>}
      <TableTotal />
      <TableKategori />
      <TableSubKategori />
      <TableProduk />
    </div>
  );
};

export default PenjualanDetailComponent;
