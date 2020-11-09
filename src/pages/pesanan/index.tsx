import React, { useContext } from 'react';
import { Button, Card, Row, Input, Tabs } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import styles from './index.less';

import { PermissionContext } from '@/layouts/context';

import TableDelivery from './TableDelivery';
import TablePickUp from './TablePickUp';

import PageUnauthorized from '@/components/PageUnauthorized';

interface Props {}

const { TabPane } = Tabs;

const PesananComponent: React.FC<Props> = () => {
  const context = useContext(PermissionContext);

  const pesanan_access = context && context[3];

  if (
    pesanan_access &&
    !pesanan_access.read &&
    !pesanan_access.delete &&
    !pesanan_access.update &&
    !pesanan_access.create
  ) {
    return <PageUnauthorized />;
  }

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
              <TabPane tab="Menunggu Pembayaran" key="1">
                <TableDelivery pesanan_access={pesanan_access} status={1} />
              </TabPane>
              <TabPane tab="Menunggu Konfirmasi" key="2">
                <TableDelivery pesanan_access={pesanan_access} status={2} />
              </TabPane>
              <TabPane tab="Dalam Proses" key="3">
                <TableDelivery pesanan_access={pesanan_access} status={3} />
              </TabPane>
              <TabPane tab="Sedang Dikirim" key="4">
                <TableDelivery pesanan_access={pesanan_access} status={4} />
              </TabPane>
              <TabPane tab="Penyesuaian" key="6">
                <TableDelivery pesanan_access={pesanan_access} status={6} />
              </TabPane>
              <TabPane tab="Selesai" key="7">
                <TableDelivery pesanan_access={pesanan_access} status={7} />
              </TabPane>
              <TabPane tab="Batal" key="8">
                <TableDelivery pesanan_access={pesanan_access} status={8} />
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="Store Pick Up" key="2">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Menunggu Pembayaran" key="1">
                <TablePickUp pesanan_access={pesanan_access} status={1} />
              </TabPane>
              <TabPane tab="Menunggu Konfirmasi" key="2">
                <TablePickUp pesanan_access={pesanan_access} status={2} />
              </TabPane>
              <TabPane tab="Dalam Proses" key="3">
                <TablePickUp pesanan_access={pesanan_access} status={3} />
              </TabPane>
              <TabPane tab="Menunggu Pick Up" key="5">
                <TablePickUp pesanan_access={pesanan_access} status={5} />
              </TabPane>
              <TabPane tab="Penyesuaian" key="6">
                <TablePickUp pesanan_access={pesanan_access} status={6} />
              </TabPane>
              <TabPane tab="Selesai" key="7">
                <TablePickUp pesanan_access={pesanan_access} status={7} />
              </TabPane>
              <TabPane tab="Batal" key="8">
                <TablePickUp pesanan_access={pesanan_access} status={8} />
              </TabPane>
            </Tabs>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default PesananComponent;
