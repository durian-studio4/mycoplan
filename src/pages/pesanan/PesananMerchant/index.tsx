import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Tabs } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import styles from './index.less';

import { TabsDelivery } from '../TabsDelivery';
import { TabsPickUp } from '../TabsPickUp';

import TableDelivery from './TableDelivery';
import TablePickUp from './TablePickUp';

import useDownloadCsv from '@/hooks/useDownloadCsv';
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

  //sub pengiriman
  const [data_dikirim, status_dikirim, loading_dikirim, error_dikirim, fetchDikirim] = useFetch();
  const [
    data_pengambilan,
    status_pengambilan,
    loading_pengambilan,
    error_pengambilan,
    fetchPengambilan,
  ] = useFetch();
  const [
    data_pengiriman,
    status_pengiriman,
    loading_pengiriman,
    error_pengiriman,
    fetchPengiriman,
  ] = useFetch();
  const [data_selesai, status_selesai, loading_selesai, error_selesai, fetchSelesai] = useFetch();
  const [data_gagal, status_gagal, loading_gagal, error_gagal, fetchGagal] = useFetch();

  const [loading_update, status_update, postCreate, postUpdate] = useCreate();

  const [loading_download, onDownloadCSV] = useDownloadCsv();

  const [statusDelivery, setStatusDelivery] = useState('1');
  const [statusPickUp, setStatusPickUp] = useState('1');

  const [statusPengiriman, setStatusPengiriman] = useState('pengambilan');

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

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (statusDelivery === '4') {
        return fetchDikirim(
          `${REACT_APP_ENV}/merchant/orders/?method=delivery&status=4&gosend_status=dikirim`,
        );
      }
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update, statusDelivery]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (statusDelivery === '4') {
        return fetchPengambilan(
          `${REACT_APP_ENV}/merchant/orders/?method=delivery&status=4&gosend_status=pengambilan`,
        );
      }
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update, statusDelivery]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (statusDelivery === '4') {
        fetchPengiriman(
          `${REACT_APP_ENV}/merchant/orders/?method=delivery&status=4&gosend_status=pengiriman`,
        );
      }
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update, statusDelivery]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (statusDelivery === '4') {
        fetchSelesai(
          `${REACT_APP_ENV}/merchant/orders/?method=delivery&status=4&gosend_status=selesai`,
        );
      }
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update, statusDelivery]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (statusDelivery === '4') {
        fetchGagal(
          `${REACT_APP_ENV}/merchant/orders/?method=delivery&status=4&gosend_status=gagal`,
        );
      }
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update, statusDelivery]);

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

  //data length sub pengiriman
  let data_jumlah_dikirim = () => {
    if (Boolean(loading_dikirim)) {
      return 0;
    } else {
      if (status_dikirim !== 200 || error_dikirim) {
        return 0;
      } else {
        return data_dikirim;
      }
    }
  };
  let data_jumlah_pengambilan = () => {
    if (Boolean(loading_pengambilan)) {
      return 0;
    } else {
      if (status_pengambilan !== 200 || error_pengambilan) {
        return 0;
      } else {
        return data_pengambilan;
      }
    }
  };
  let data_jumlah_pengiriman = () => {
    if (Boolean(loading_pengiriman)) {
      return 0;
    } else {
      if (status_pengiriman !== 200 || error_pengiriman) {
        return 0;
      } else {
        return data_pengiriman;
      }
    }
  };
  let data_jumlah_selesai = () => {
    if (Boolean(loading_selesai)) {
      return 0;
    } else {
      if (status_selesai !== 200 || error_selesai) {
        return 0;
      } else {
        return data_selesai;
      }
    }
  };
  let data_jumlah_gagal = () => {
    if (Boolean(loading_gagal)) {
      return 0;
    } else {
      if (status_gagal !== 200 || error_gagal) {
        return 0;
      } else {
        return data_gagal;
      }
    }
  };

  return (
    <div>
      <p className={styles.title}>Pesanan</p>
      <Card>
        <Row justify="space-between">
          <div className={styles.row_box}>
            <Button
              className={styles.button}
              type="primary"
              disabled={Boolean(loading_download)}
              onClick={() =>
                onDownloadCSV({
                  url: `${REACT_APP_ENV}/merchant/orders?download=1`,
                  file: 'Pesanan',
                })
              }
            >
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
              data_jumlah_dikirim={data_jumlah_dikirim}
              data_jumlah_pengambilan={data_jumlah_pengambilan}
              data_jumlah_pengiriman={data_jumlah_pengiriman}
              data_jumlah_selesai={data_jumlah_selesai}
              data_jumlah_gagal={data_jumlah_gagal}
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
