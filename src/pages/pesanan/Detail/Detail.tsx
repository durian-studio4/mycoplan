import React, { Fragment } from 'react';
import { Row } from 'antd';
import styles from './index.less';

import PageLoading from '@/components/PageLoading';

interface Props {
  loading: boolean;
  data: any;
}

const DetailComponent: React.FC<Props> = ({ data, loading }) => {
  const detail_order = data.detail_order;
  const detail_payment = data.detail_payment;
  return (
    <Fragment>
      <Row>
        <p className={styles.title}>Detail Pesanan</p>
        {Boolean(loading) ? (
          <PageLoading />
        ) : (
          <div className={styles.box10}>
            <table style={{ textAlign: 'center', width: '50%' }}>
              <tbody>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Metode
                  </td>
                  <td align="center">:</td>
                  <td align="right">{detail_order && detail_order.method}</td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Super Market
                  </td>
                  <td align="center">:</td>
                  <td align="right">{detail_order && detail_order.merchant_name}</td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    No. Pesanan
                  </td>
                  <td align="center">:</td>
                  <td align="right">{detail_order && detail_order.transaction_code}</td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Status Transaksi
                  </td>
                  <td align="center">:</td>
                  <td align="right">{detail_order && detail_order.transaction_status}</td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Tanggal Transaksi
                  </td>
                  <td align="center">:</td>
                  <td align="right">{detail_order && detail_order.transaction_date}</td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Jadwal Delivery
                  </td>
                  <td align="center">:</td>
                  <td align="right">{detail_order && detail_order.delivery_schedule}</td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Nama Penerima
                  </td>
                  <td align="center">:</td>
                  <td align="right">{detail_order && detail_order.recipient_name}</td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Nomor Telepon
                  </td>
                  <td align="center">:</td>
                  <td align="right">{detail_order && detail_order.recipient_phone}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Row>
      <Row style={{ margin: '1em 0' }}>
        <p className={styles.title}>Detail Pembayaran</p>
        {Boolean(loading) ? (
          <PageLoading />
        ) : (
          <div className={styles.box10}>
            <table style={{ textAlign: 'center', width: '50%' }}>
              <tbody>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Total Pesanan
                  </td>
                  <td align="center">:</td>
                  <td align="right">
                    {detail_payment && detail_payment.total_order
                      ? Number(detail_payment.total_order).toLocaleString()
                      : null}
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Total Delivery
                  </td>
                  <td align="center">:</td>
                  <td align="right">
                    {detail_payment && detail_payment.delivery
                      ? Number(detail_payment.delivery).toLocaleString()
                      : null}
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Promo
                  </td>
                  <td align="center">:</td>
                  <td align="right">{detail_payment && detail_payment.promo}</td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Penyesuaian Harga
                  </td>
                  <td align="center">:</td>
                  <td align="right">{detail_payment && detail_payment.adjustment}</td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Total Pembayaran
                  </td>
                  <td align="center">:</td>
                  <td align="right">
                    {detail_payment && detail_payment.total_payment
                      ? Number(detail_payment.total_payment).toLocaleString()
                      : null}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Row>
    </Fragment>
  );
};

export default DetailComponent;
