import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

interface Props {
  children: React.ReactNode;
  data_jumlah_delivery: (status: number) => void;
  data_jumlah_dikirim: () => void;
  data_jumlah_pengambilan: () => void;
  data_jumlah_pengiriman: () => void;
  data_jumlah_selesai: () => void;
  data_jumlah_gagal: () => void;
  onChangeStatus: (key: string) => void;
  onChangeStatusPengiriman: (key: string) => void;
}

export const TabsDelivery: React.FC<Props> = ({
  children,
  data_jumlah_delivery,
  data_jumlah_dikirim,
  data_jumlah_pengambilan,
  data_jumlah_pengiriman,
  data_jumlah_selesai,
  data_jumlah_gagal,
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
            <TabPane
              tab={`Request Delivery Ulang (${data_jumlah_dikirim().length || 0})`}
              key="dikirim"
            />
            <TabPane
              tab={`Dalam Pengambilan (${data_jumlah_pengambilan().length || 0})`}
              key="pengambilan"
            />
            <TabPane
              tab={`Dalam Pengiriman (${data_jumlah_pengiriman().length || 0})`}
              key="pengiriman"
            />
            <TabPane
              tab={`Pengiriman Selesai (${data_jumlah_selesai().length || 0})`}
              key="selesai"
            />
            <TabPane tab={`Pengiriman Gagal (${data_jumlah_gagal().length || 0})`} key="gagal" />
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
