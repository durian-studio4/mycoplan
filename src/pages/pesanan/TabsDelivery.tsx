import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

interface Props {
  children: React.ReactNode;
  data_jumlah_delivery: (status: number) => void;
  onChangeStatus: (key: string) => void;
  onChangeStatusPengiriman: (key: string) => void;
}

export const TabsDelivery: React.FC<Props> = ({
  children,
  data_jumlah_delivery,
  onChangeStatus,
  onChangeStatusPengiriman,
}) => {
  return (
    <>
      <Tabs defaultActiveKey="1" onChange={onChangeStatus}>
        <TabPane tab={`Menunggu Pembayaran (${data_jumlah_delivery(1).length || 0})`} key="1" />
        <TabPane tab={`Menunggu Konfirmasi (${data_jumlah_delivery(2).length || 0})`} key="2" />
        <TabPane tab={`Dalam Proses (${data_jumlah_delivery(3).length || 0})`} key="3" />
        <TabPane tab={`Pengajuan Pembatalan (${data_jumlah_delivery(10).length || 0})`} key="10" />
        <TabPane tab={`Pengiriman (${data_jumlah_delivery(4).length || 0})`} key="4">
          <Tabs defaultActiveKey="pengambilan" onChange={onChangeStatusPengiriman}>
            <TabPane tab="Request Delivery Ulang" key="dikirim" />
            <TabPane tab="Dalam Pengambilan" key="pengambilan" />
            <TabPane tab="Dalam Pengiriman" key="pengiriman" />
            <TabPane tab="Pesanan Selesai" key="selesai" />
            <TabPane tab="Pesanan Gagal" key="gagal" />
          </Tabs>
        </TabPane>
        <TabPane tab={`Penyesuaian (${data_jumlah_delivery(6).length || 0})`} key="6" />
        <TabPane tab={`Selesai (${data_jumlah_delivery(7).length || 0})`} key="7" />
        <TabPane tab={`Batal (${data_jumlah_delivery(8).length || 0})`} key="8" />
        <TabPane tab={`Expired (${data_jumlah_delivery(9).length || 0})`} key="9" />
      </Tabs>
      {children}
    </>
  );
};
