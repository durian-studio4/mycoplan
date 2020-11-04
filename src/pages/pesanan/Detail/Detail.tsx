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
                  <td align="right">
                    {detail_order && detail_order.method ? detail_order.method : '-'}
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Super Market
                  </td>
                  <td align="center">:</td>
                  <td align="right">
                    {detail_order && detail_order.merchant_name ? detail_order.merchant_name : '-'}
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    No. Pesanan
                  </td>
                  <td align="center">:</td>
                  <td align="right">
                    {detail_order && detail_order.transaction_code
                      ? detail_order.transaction_code
                      : '-'}
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Status Transaksi
                  </td>
                  <td align="center">:</td>
                  <td align="right">
                    {detail_order && detail_order.transaction_status
                      ? detail_order.transaction_status
                      : '-'}
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Tanggal Transaksi
                  </td>
                  <td align="center">:</td>
                  <td align="right">
                    {detail_order && detail_order.transaction_date
                      ? detail_order.transaction_date
                      : '-'}
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Tanggal Delivery
                  </td>
                  <td align="center">:</td>
                  <td align="right">
                    {detail_order && detail_order.delivery_schedule
                      ? detail_order.delivery_schedule
                      : '-'}
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Waktu Delivery
                  </td>
                  <td align="center">:</td>
                  <td align="right">
                    {detail_order && detail_order.start_time && detail_order.end_time
                      ? detail_order.start_time + ' - ' + detail_order.end_time
                      : '-'}
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Nama Penerima
                  </td>
                  <td align="center">:</td>
                  <td align="right">
                    {detail_order && detail_order.recipient_name
                      ? detail_order.recipient_name
                      : '-'}
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Nomor Telepon
                  </td>
                  <td align="center">:</td>
                  <td align="right">
                    {detail_order && detail_order.recipient_phone
                      ? detail_order.recipient_phone
                      : '-'}
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Alamat Kirim
                  </td>
                  <td align="center">:</td>
                  <td align="right">
                    {detail_order && detail_order.recipient_address
                      ? detail_order.recipient_address
                      : '-'}
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Detail Alamat
                  </td>
                  <td align="center">:</td>
                  <td align="right">
                    {detail_order && detail_order.recipient_address_detail
                      ? detail_order.recipient_address_detail
                      : '-'}
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Catatan Untuk Toko
                  </td>
                  <td align="center">:</td>
                  <td align="right">
                    {detail_order && detail_order.recipient_note
                      ? detail_order.recipient_note
                      : '-'}
                  </td>
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
                    Metode Pembayaran
                  </td>
                  <td align="center">:</td>
                  {/* <td align="right">
                    {detail_payment && detail_payment.total_order
                      ? Number(detail_payment.total_order).toLocaleString()
                      : '-'}
                  </td> */}
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Total Pesanan
                  </td>
                  <td align="center">:</td>
                  <td align="right">
                    {detail_payment && detail_payment.total_order
                      ? Number(detail_payment.total_order).toLocaleString()
                      : '-'}
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Total Delivery
                  </td>
                  <td align="center">:</td>
                  <td align="right">
                    {detail_payment && detail_payment.total_delivery
                      ? Number(detail_payment.total_delivery).toLocaleString()
                      : '-'}
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Promo
                  </td>
                  <td align="center">:</td>
                  <td align="right">
                    {detail_payment && detail_payment.promo
                      ? Number(detail_payment.promo).toLocaleString()
                      : '-'}
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Penyesuaian Harga
                  </td>
                  <td align="center">:</td>
                  <td align="right">
                    {detail_payment && detail_payment.adjustment
                      ? Number(detail_payment.adjustment).toLocaleString()
                      : '-'}
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ width: '30%' }}>
                    Total Pembayaran
                  </td>
                  <td align="center">:</td>
                  <td align="right">
                    {detail_payment && detail_payment.total_payment
                      ? Number(detail_payment.total_payment).toLocaleString()
                      : '-'}
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
