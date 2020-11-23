import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Tabs } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import styles from './index.less';

import { TabsDelivery } from '../TabsDelivery';
import { TabsPickUp } from '../TabsPickUp';

import TableDelivery from './TableDelivery';
import TablePickUp from './TablePickUp';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

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
  const [loading_update, status_update, postCreate, postUpdate] = useCreate();

  const [statusDelivery, setStatusDelivery] = useState('1');
  const [statusPickUp, setStatusPickUp] = useState('1');

  const [statusPengiriman, setStatusPengiriman] = useState('dikirim');

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchDelivery(`${REACT_APP_ENV}/merchant/orders/?method=delivery`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchPickUp(`${REACT_APP_ENV}/merchant/orders/?method=pickup`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  const onChangeStatusDelivery = (key: string) => setStatusDelivery(key);
  const onChangeStatusPickUp = (key: string) => setStatusPickUp(key);

  const onChangeStatusPengiriman = (key: string) => setStatusPengiriman(key);

  const updateDelivery = (id: string, id_status: string) => {
    postUpdate(`${REACT_APP_ENV}/merchant/orders/${id}`, JSON.stringify({ id_status }));
  };

  const createRequest = ({ json, clear }: any) => {
    postCreate(`${REACT_APP_ENV}/merchant/gosend-booking`, json, clear);
  };

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
            <TabsDelivery
              onChangeStatus={onChangeStatusDelivery}
              onChangeStatusPengiriman={onChangeStatusPengiriman}
              data_jumlah_delivery={data_jumlah_delivery}
            >
              <TableDelivery
                status={statusDelivery}
                status_pengiriman={statusPengiriman}
                loading_update={Boolean(loading_update)}
                status_update={Number(status_update)}
                requestCreate={createRequest}
                updateDelivery={updateDelivery}
              />
            </TabsDelivery>
          </TabPane>
          <TabPane tab="Store Pick Up" key="2">
            <TabsPickUp
              data_jumlah_pick_up={data_jumlah_pick_up}
              onChangeStatus={onChangeStatusPickUp}
            >
              <TablePickUp
                status={statusPickUp}
                loading_update={Boolean(loading_update)}
                status_update={Number(status_update)}
                updateDelivery={updateDelivery}
              />
            </TabsPickUp>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default PesananComponent;
