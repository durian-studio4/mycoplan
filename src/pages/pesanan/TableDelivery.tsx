import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

import RequestComponent from './Request';
import LacakComponent from './Lacak';
import PageError from '@/components/PageError';

import useFetch from '@/hooks/useFetch';

import { useTableDelivery } from './utils/useTableAdmin';
interface Props {
  pesanan_access: any;
  status: string;
  status_pengiriman: string;
  status_update: number;
  loading_update: boolean;
  requestCreate: ({ json, clear }: any) => void;
  updateDelivery: (id: string, id_status: string) => void;
}

const TableDeliveryComponent: React.FC<Props> = ({
  pesanan_access,
  status,
  status_pengiriman,
  status_update,
  loading_update,
  requestCreate,
  updateDelivery,
}) => {
  // const [getColumnSearchProps] = useFilterColumn();
  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();

  const [visible, setVisible] = useState(false);
  const [visible_pesanan, setVisiblePesanan] = useState(false);
  const [id_transaction, setIdTransaction] = useState(0);

  const [notes, setNotes] = useState<string | null>('');
  const [nama, setNama] = useState<string | null>('');
  const [noTelp, setNoTelp] = useState<string | null>('');

  const [merchantName, setMerchantName] = useState<string | null>('');

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (status === '4') {
        return fetchList(
          `${REACT_APP_ENV}/admin/orders/?method=delivery&status=${status}&gosend_status=${status_pengiriman}`,
        );
      }
      return fetchList(`${REACT_APP_ENV}/admin/orders/?method=delivery&status=${status}`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update, status, status_pengiriman]);

  const handleVisible = (id: string) => {
    setIdTransaction(Number(id));
    setVisible(!visible);
  };

  const handleVisibleClear = () => {
    setIdTransaction(0);
    setVisible(!visible);
  };

  const handleVisiblePesanan = (
    id: string,
    notes: string | null,
    nama: string | null,
    noTelp: string | null,
    merchantName: string | null,
  ) => {
    setIdTransaction(Number(id));
    setNama(nama);
    setNotes(notes);
    setNoTelp(noTelp);
    setMerchantName(merchantName);
    setVisiblePesanan(!visible_pesanan);
  };

  const handleVisiblePesananClear = () => {
    setIdTransaction(0);
    setNotes('');
    setNama('');
    setNoTelp('');
    setMerchantName('');
    setVisiblePesanan(false);
  };

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
      notes: data_list[key].notes,
      start: data_list[key].start_time,
      end: data_list[key].end_time,
    });
  }

  const [columns] = useTableDelivery({
    loading: Boolean(loading_update),
    updateDelivery,
    handleVisiblePesanan,
    handleVisible,
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
        style={{ display: pesanan_access && pesanan_access.read ? 'block' : 'none' }}
      />
      {visible ? (
        <RequestComponent
          visible={visible}
          id_transaction={id_transaction}
          onCreate={requestCreate}
          onCancel={handleVisibleClear}
          onLoadButton={Boolean(loading_update)}
        />
      ) : null}
      {visible_pesanan ? (
        <LacakComponent
          role="admin"
          visible={visible_pesanan}
          id_transaction={id_transaction}
          notes={notes}
          nama={nama}
          no_telp={noTelp}
          merchant_name={merchantName}
          onCancel={handleVisiblePesananClear}
        />
      ) : null}
    </>
  );
};

export default TableDeliveryComponent;
