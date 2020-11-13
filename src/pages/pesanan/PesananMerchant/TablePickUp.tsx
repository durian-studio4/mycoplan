import React, { useEffect } from 'react';
import { Table } from 'antd';

// import RequestComponent from '../Request';
import PageError from '@/components/PageError';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

import { useTablePickUp } from '../utils/TableMerchant';

interface Props {
  status: number;
}

const TablePickUpComponent: React.FC<Props> = ({ status }) => {
  // const [getColumnSearchProps] = useFilterColumn();
  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(`${REACT_APP_ENV}/merchant/orders/?method=pickup&status=${status}`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update, status]);

  const updateDelivery = (id: string, id_status: string) => {
    postUpdate(`${REACT_APP_ENV}/merchant/orders/${id}`, JSON.stringify({ id_status }));
  };

  // const createRequest = ({ json, clear }: any) => {
  //   postCreate(`${REACT_APP_ENV}/merchant/gosend-booking`, json, clear);
  // };

  let data_array = [];

  for (let key in data_list) {
    data_array.push({
      // no: Number(key) + 1,
      id: data_list[key].id,
      id_status: data_list[key].id_status,
      nama: data_list[key].nama,
      pesanan: data_list[key].no_transaksi,
      merchant: data_list[key].merchant_name,
      total: data_list[key].total_price,
      status: data_list[key].transaction_status,
      tanggal: data_list[key].transaction_date,
      jadwal: data_list[key].jadwal,
      telepon: data_list[key].no_telp,
      start: data_list[key].start_time,
      end: data_list[key].end_time,
    });
  }

  const [columns] = useTablePickUp({
    loading: Boolean(loading_update),
    updateDelivery,
  });

  // if (error) {
  //   return <PageError status={status} />;
  // }

  return (
    <>
      {error_list || status_list !== 200 ? <PageError /> : null}
      <Table
        columns={columns}
        dataSource={data_array.reverse()}
        loading={Boolean(loading_list)}
        scroll={{ x: 1300 }}
      />
    </>
  );
};

export default TablePickUpComponent;
