import React from 'react';

import { Tabs } from 'antd';

const { TabPane } = Tabs;

import TablePickUp from './TablePickUp';

interface Props {
  data_jumlah_pick_up: (status: number) => void;
  pesanan_access: any;
  status_update: number;
  loading_update: boolean;
  updateDelivery: (id: string, id_status: string) => void;
}

export const TabPickUp: React.FC<Props> = ({
  data_jumlah_pick_up,
  pesanan_access,
  status_update,
  loading_update,
  updateDelivery,
}) => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab={`Menunggu Pembayaran (${data_jumlah_pick_up(1).length || 0})`} key="1">
        <TablePickUp
          pesanan_access={pesanan_access}
          status={1}
          status_update={status_update}
          loading_update={loading_update}
          updateDelivery={updateDelivery}
        />
      </TabPane>
      <TabPane tab={`Menunggu Konfirmasi (${data_jumlah_pick_up(2).length || 0})`} key="2">
        <TablePickUp
          pesanan_access={pesanan_access}
          status={2}
          status_update={status_update}
          loading_update={loading_update}
          updateDelivery={updateDelivery}
        />
      </TabPane>
      <TabPane tab={`Dalam Proses (${data_jumlah_pick_up(3).length || 0})`} key="3">
        <TablePickUp
          pesanan_access={pesanan_access}
          status={3}
          status_update={status_update}
          loading_update={loading_update}
          updateDelivery={updateDelivery}
        />
      </TabPane>
      <TabPane tab={`Menunggu Pick Up (${data_jumlah_pick_up(5).length || 0})`} key="5">
        <TablePickUp
          pesanan_access={pesanan_access}
          status={5}
          status_update={status_update}
          loading_update={loading_update}
          updateDelivery={updateDelivery}
        />
      </TabPane>
      <TabPane tab={`Penyesuaian (${data_jumlah_pick_up(6).length || 0})`} key="6">
        <TablePickUp
          pesanan_access={pesanan_access}
          status={6}
          status_update={status_update}
          loading_update={loading_update}
          updateDelivery={updateDelivery}
        />
      </TabPane>
      <TabPane tab={`Selesai (${data_jumlah_pick_up(7).length || 0})`} key="7">
        <TablePickUp
          pesanan_access={pesanan_access}
          status={7}
          status_update={status_update}
          loading_update={loading_update}
          updateDelivery={updateDelivery}
        />
      </TabPane>
      <TabPane tab={`Batal (${data_jumlah_pick_up(8).length || 0})`} key="8">
        <TablePickUp
          pesanan_access={pesanan_access}
          status={8}
          status_update={status_update}
          loading_update={loading_update}
          updateDelivery={updateDelivery}
        />
      </TabPane>
      <TabPane tab={`Expired (${data_jumlah_pick_up(9).length || 0})`} key="9">
        <TablePickUp
          pesanan_access={pesanan_access}
          status={9}
          status_update={status_update}
          loading_update={loading_update}
          updateDelivery={updateDelivery}
        />
      </TabPane>
    </Tabs>
  );
};
