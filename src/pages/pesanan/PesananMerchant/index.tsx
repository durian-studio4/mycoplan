import React, { useEffect } from 'react';
import { Button, Card, Row, Tabs } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import styles from './index.less';

import TableDelivery from './TableDelivery';
import TablePickUp from './TablePickUp';

import useFetch from '@/hooks/useFetch';

interface Props {}

const { TabPane } = Tabs;

const PesananComponent: React.FC<Props> = () => {
  const [
    data_delivery,
    status_delivery,
    loading_delivery,
    error_delivery,
    fetchDelivery,
  ] = useFetch();

  const [data_pick_up, status_pick_up, loading_pick_up, error_pick_up, fetchPickUp] = useFetch();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchDelivery(`${REACT_APP_ENV}/admin/orders/?method=delivery`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchPickUp(`${REACT_APP_ENV}/admin/orders/?method=pickup`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let data_jumlah_delivery = (id: number) => {
    if (Boolean(loading_delivery)) {
      return 0;
    } else {
      if (status_delivery !== 200 || error_delivery) {
        return 0;
      } else {
        return data_delivery.filter(({ id_status }: any) => id_status === id);
      }
    }
  };

  let data_jumlah_pick_up = (id: number) => {
    if (Boolean(loading_pick_up)) {
      return 0;
    } else {
      if (status_pick_up !== 200 || error_pick_up) {
        return 0;
      } else {
        return data_pick_up.filter(({ id_status }: any) => id_status === id);
      }
    }
  };

  return (
    <div>
      <p className={styles.title}>Pesanan</p>
      <Card>
        <Row justify="space-between">
          <div className={styles.row_box}>
            <Button className={styles.button} type="primary">
              <DownloadOutlined /> Download CSV
            </Button>
          </div>
        </Row>
        <Tabs>
          <TabPane tab="Delivery" key="1">
            <Tabs defaultActiveKey="1">
              <TabPane tab={`Menunggu Pembayaran (${data_jumlah_delivery(1).length || 0})`} key="1">
                <TableDelivery status={1} />
              </TabPane>
              <TabPane tab={`Menunggu Konfirmasi (${data_jumlah_delivery(2).length || 0})`} key="2">
                <TableDelivery status={2} />
              </TabPane>
              <TabPane tab={`Dalam Proses (${data_jumlah_delivery(3).length || 0})`} key="3">
                <TableDelivery status={3} />
              </TabPane>
              <TabPane tab={`Sedang Dikirim (${data_jumlah_delivery(4).length || 0})`} key="4">
                <TableDelivery status={4} />
              </TabPane>
              <TabPane tab={`Penyesuaian (${data_jumlah_delivery(6).length || 0})`} key="6">
                <TableDelivery status={6} />
              </TabPane>
              <TabPane tab={`Selesai (${data_jumlah_delivery(7).length || 0})`} key="7">
                <TableDelivery status={7} />
              </TabPane>
              <TabPane tab={`Batal (${data_jumlah_delivery(8).length || 0})`} key="8">
                <TableDelivery status={8} />
              </TabPane>
              <TabPane tab={`Expired (${data_jumlah_delivery(9).length || 0})`} key="9">
                <TableDelivery status={9} />
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="Store Pick Up" key="2">
            <Tabs defaultActiveKey="1">
              <TabPane tab={`Menunggu Pembayaran (${data_jumlah_pick_up(1).length || 0})`} key="1">
                <TablePickUp status={1} />
              </TabPane>
              <TabPane tab={`Menunggu Konfirmasi (${data_jumlah_pick_up(2).length || 0})`} key="2">
                <TablePickUp status={2} />
              </TabPane>
              <TabPane tab={`Dalam Proses (${data_jumlah_pick_up(3).length || 0})`} key="3">
                <TablePickUp status={3} />
              </TabPane>
              <TabPane tab={`Menunggu Pick Up (${data_jumlah_pick_up(5).length || 0})`} key="5">
                <TablePickUp status={5} />
              </TabPane>
              <TabPane tab={`Penyesuaian (${data_jumlah_pick_up(6).length || 0})`} key="6">
                <TablePickUp status={6} />
              </TabPane>
              <TabPane tab={`Selesai (${data_jumlah_pick_up(7).length || 0})`} key="7">
                <TablePickUp status={7} />
              </TabPane>
              <TabPane tab={`Batal (${data_jumlah_pick_up(8).length || 0})`} key="8">
                <TablePickUp status={8} />
              </TabPane>
              <TabPane tab={`Expired (${data_jumlah_pick_up(9).length || 0})`} key="9">
                <TablePickUp status={9} />
              </TabPane>
            </Tabs>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default PesananComponent;
