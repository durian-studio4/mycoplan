import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

import TableDelivery from './TableDelivery';

interface Props {
  data_jumlah_delivery: (status: number) => void;
  pesanan_access: any;
  status_update: number;
  loading_update: boolean;
  createRequest: ({ json, clear }: any) => void;
  updateDelivery: (id: string, id_status: string) => void;
}

export const TabDelivery: React.FC<Props> = ({
  data_jumlah_delivery,
  pesanan_access,
  loading_update,
  status_update,
  createRequest,
  updateDelivery,
}) => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab={`Menunggu Pembayaran (${data_jumlah_delivery(1).length || 0})`} key="1">
        <TableDelivery
          pesanan_access={pesanan_access}
          status={1}
          status_update={status_update}
          loading_update={loading_update}
          requestCreate={createRequest}
          updateDelivery={updateDelivery}
        />
      </TabPane>
      <TabPane tab={`Menunggu Konfirmasi (${data_jumlah_delivery(2).length || 0})`} key="2">
        <TableDelivery
          pesanan_access={pesanan_access}
          status={2}
          status_update={status_update}
          loading_update={loading_update}
          requestCreate={createRequest}
          updateDelivery={updateDelivery}
        />
      </TabPane>
      <TabPane tab={`Dalam Proses (${data_jumlah_delivery(3).length || 0})`} key="3">
        <TableDelivery
          pesanan_access={pesanan_access}
          status={3}
          status_update={status_update}
          loading_update={loading_update}
          requestCreate={createRequest}
          updateDelivery={updateDelivery}
        />
      </TabPane>
      <TabPane tab={`Sedang Dikirim (${data_jumlah_delivery(4).length || 0})`} key="4">
        <TableDelivery
          pesanan_access={pesanan_access}
          status={4}
          status_update={status_update}
          loading_update={loading_update}
          requestCreate={createRequest}
          updateDelivery={updateDelivery}
        />
      </TabPane>
      <TabPane tab={`Penyesuaian (${data_jumlah_delivery(6).length || 0})`} key="6">
        <TableDelivery
          pesanan_access={pesanan_access}
          status={6}
          status_update={status_update}
          loading_update={loading_update}
          requestCreate={createRequest}
          updateDelivery={updateDelivery}
        />
      </TabPane>
      <TabPane tab={`Selesai (${data_jumlah_delivery(7).length || 0})`} key="7">
        <TableDelivery
          pesanan_access={pesanan_access}
          status={7}
          status_update={status_update}
          loading_update={loading_update}
          requestCreate={createRequest}
          updateDelivery={updateDelivery}
        />
      </TabPane>
      <TabPane tab={`Batal (${data_jumlah_delivery(8).length || 0})`} key="8">
        <TableDelivery
          pesanan_access={pesanan_access}
          status={8}
          status_update={status_update}
          loading_update={loading_update}
          requestCreate={createRequest}
          updateDelivery={updateDelivery}
        />
      </TabPane>
      <TabPane tab={`Expired (${data_jumlah_delivery(9).length || 0})`} key="9">
        <TableDelivery
          pesanan_access={pesanan_access}
          status={9}
          status_update={status_update}
          loading_update={loading_update}
          requestCreate={createRequest}
          updateDelivery={updateDelivery}
        />
      </TabPane>
    </Tabs>
  );
};
