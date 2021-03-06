import React, { useEffect } from 'react';
import { Modal, Avatar, Row, Button, Divider, Col } from 'antd';
import styles from './index.less';

import useFetch from '@/hooks/useFetch';

import PageError from '@/components/PageError';
import PageLoading from '@/components/PageLoading';

interface Props {
  visible: boolean;
  role: string;
  id_transaction: number;
  nama: string | null;
  no_telp: string | null;
  merchant_name: string | null;
  onCancel: () => void;
}

const LacakComponent: React.FC<Props> = ({
  visible,
  role,
  id_transaction,
  nama,
  no_telp,
  merchant_name,
  onCancel,
}) => {
  const [data_list, status_list, loading_list, error_list, fetchData] = useFetch();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchData(`${REACT_APP_ENV}/${role}/gosend-booking/${id_transaction}`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_transaction, role]);

  return (
    <Modal visible={visible} title="Lacak Pesanan" onCancel={onCancel} footer={null}>
      {status_list !== 200 || error_list ? <PageError /> : null}
      {Boolean(loading_list) ? (
        <PageLoading />
      ) : (
        <div className={styles.modal_body}>
          <div className={styles.box10}>
            <Row justify="space-between" align="middle" style={{ margin: 10, height: '50px' }}>
              <Avatar
                style={{ verticalAlign: 'middle' }}
                size="large"
                gap={2}
                src={data_list.driverPhoto}
              />
              <Row justify="space-between" style={{ width: '90%', marginTop: 10 }}>
                <p>{data_list.driverName ? data_list.driverName : '-'}</p>
                {/*
                <div>
                  5
                  <StarTwoTone twoToneColor="#ffc234" style={{ marginLeft: 5 }} />
                </div> */}
              </Row>
            </Row>
            <Divider />
          </div>
          <div className={styles.box10}>
            <Row align="middle" style={{ margin: 10 }}>
              <Col>
                <p>No Motor</p>
                <p style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {data_list.vehicleNumber ? data_list.vehicleNumber : '-'}
                </p>
                {/* <p>Lark Alfen</p> */}
              </Col>
            </Row>
            <Divider />
          </div>
          <div className={styles.box10}>
            <Row align="middle" style={{ margin: 10 }}>
              <Col>
                <p>No Resi</p>
                <p style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {data_list.orderNo ? data_list.orderNo : '-'}
                </p>
              </Col>
            </Row>
            <Divider />
          </div>

          <div className={styles.box10}>
            <p style={{ fontWeight: 'bold', fontSize: 16 }}>Pembeli</p>
            <Row align="middle" style={{ margin: '5px 10px' }}>
              <Col>
                <p style={{ fontWeight: 'bold' }}>Nama Pembeli</p>
                <p>{nama ? nama : '-'}</p>
              </Col>
            </Row>
            <Row align="middle" style={{ margin: '5px 10px' }}>
              <Col>
                <p style={{ fontWeight: 'bold' }}>No.Telp Pembeli</p>
                <p>{no_telp ? no_telp : '-'}</p>
              </Col>
            </Row>
            <Row align="middle" style={{ margin: '5px 10px' }}>
              <Col>
                <p style={{ fontWeight: 'bold' }}>Alamat Pembeli</p>
                <p>{data_list.buyerAddressDetail ? data_list.buyerAddressDetail : '-'}</p>
              </Col>
            </Row>
            <Row align="middle" style={{ margin: '5px 10px' }}>
              <Col>
                <p style={{ fontWeight: 'bold' }}>Catatan Pembeli</p>
                {/* <p>{data_list.buyer_note ? data_list.buyer_note : '-'}</p> */}
                <p>
                  {data_list.buyer_address && data_list.buyer_address.detail_alamat
                    ? data_list.buyer_address.detail_alamat
                    : '-'}
                </p>
              </Col>
            </Row>
            <Divider />
          </div>

          <div className={styles.box10}>
            <p style={{ fontWeight: 'bold', fontSize: 16 }}>Penjual</p>
            <Row align="middle" style={{ margin: '5px 10px' }}>
              <Col>
                <p style={{ fontWeight: 'bold' }}>Nama Penjual</p>
                <p>{merchant_name ? merchant_name : '-'}</p>
              </Col>
            </Row>
            <Row align="middle" style={{ margin: '5px 10px' }}>
              <Col>
                <p style={{ fontWeight: 'bold' }}>No.Telp Penjual</p>
                <p>{data_list.sender_phone ? data_list.sender_phone : '-'}</p>
              </Col>
            </Row>
            <Row align="middle" style={{ margin: '5px 10px' }}>
              <Col>
                <p style={{ fontWeight: 'bold' }}>Alamat Penjual</p>
                {/* <p>{data_list.sellerAddressName ? data_list.sellerAddressName : '-'}</p> */}
                <p>{data_list.sellerAddressDetail ? data_list.sellerAddressDetail : '-'}</p>
              </Col>
            </Row>
            <Row align="middle" style={{ margin: '5px 10px' }}>
              <Col>
                <p style={{ fontWeight: 'bold' }}>Catatan Penjual</p>
                <p>{data_list.sender_note ? data_list.sender_note : '-'}</p>
              </Col>
            </Row>
            <Divider />
          </div>

          <Button
            className={styles.button}
            onClick={() => window.open(data_list.liveTrackingUrl)}
            type="primary"
          >
            Lacak Driver
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default LacakComponent;
