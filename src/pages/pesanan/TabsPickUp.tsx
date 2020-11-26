import React from 'react';

import { Tabs } from 'antd';

const { TabPane } = Tabs;

interface Props {
  data_jumlah_pick_up: (status: number) => void;
  children: React.ReactNode;
  onChangeStatus: (key: string) => void;
}

export const TabsPickUp: React.FC<Props> = ({ children, data_jumlah_pick_up, onChangeStatus }) => {
  return (
    <>
      <Tabs defaultActiveKey="1" onChange={onChangeStatus}>
        <TabPane tab={`Menunggu Pembayaran (${data_jumlah_pick_up(1).length || 0})`} key="1" />
        <TabPane tab={`Menunggu Konfirmasi (${data_jumlah_pick_up(2).length || 0})`} key="2" />
        <TabPane tab={`Dalam Proses (${data_jumlah_pick_up(3).length || 0})`} key="3" />
        <TabPane tab={`Menunggu Pick Up (${data_jumlah_pick_up(5).length || 0})`} key="5" />
        <TabPane tab={`Penyesuaian (${data_jumlah_pick_up(6).length || 0})`} key="6" />
        <TabPane tab={`Selesai (${data_jumlah_pick_up(7).length || 0})`} key="7" />
        <TabPane tab={`Batal (${data_jumlah_pick_up(8).length || 0})`} key="8" />
        <TabPane tab={`Expired (${data_jumlah_pick_up(9).length || 0})`} key="9" />
        <TabPane tab={`Pengajuan Pembatalan (${data_jumlah_pick_up(10).length || 0})`} key="10" />
      </Tabs>
      {children}
    </>
  );
};
