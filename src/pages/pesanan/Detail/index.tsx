import React from 'react';
import { Button, Card, Row } from 'antd';
import styles from './index.less';

import TableComponent from './Table';

interface Props {}

const PesananDetailComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Detail Pesanan</p>
      <Card>
        <Row>
          <p className={styles.title}>Detail Pesanan</p>
          <div className={styles.box10}>
            <table style={{ textAlign: 'center', width: '50%' }}>
              <tbody>
                <tr>
                  <td align="left">Metode</td>
                  <td align="center">:</td>
                  {/* <td align="right">{data && data.tanggal}</td> */}
                </tr>
                <tr>
                  <td align="left">Super Market</td>
                  <td align="center">:</td>
                  {/* <td align="right">{data && data.nama_sales}</td> */}
                </tr>
                <tr>
                  <td align="left">No. Pesanan</td>
                  <td align="center">:</td>
                  <td align="left">PT. Alternate Farma</td>
                </tr>
                <tr>
                  <td align="left">Status Pembayaran</td>
                  <td align="center">:</td>
                  {/* <td align="right">{data.pembeli && data.pembeli.alamat}</td> */}
                </tr>
                <tr>
                  <td align="left">Tanggal Transaksi</td>
                  <td align="center">:</td>
                  {/* <td align="right">{data.pembeli && data.pembeli.phone}</td> */}
                </tr>
                <tr>
                  <td align="left">Jadwal Delivery</td>
                  <td align="center">:</td>
                  {/* <td align="right">{data.pembeli && data.pembeli.phone}</td> */}
                </tr>
                <tr>
                  <td align="left">Nama Penerima</td>
                  <td align="center">:</td>
                  {/* <td align="right">{data.pembeli && data.pembeli.phone}</td> */}
                </tr>
                <tr>
                  <td align="left">Nomor Telepon</td>
                  <td align="center">:</td>
                  {/* <td align="right">{data.pembeli && data.pembeli.phone}</td> */}
                </tr>
                <tr>
                  <td align="left">Status Pemesanan</td>
                  <td align="center">:</td>
                  {/* <td align="right">{data.pembeli && data.pembeli.phone}</td> */}
                </tr>
              </tbody>
            </table>
          </div>
        </Row>
        <Row style={{ margin: '1em 0px' }}>
          <p className={styles.title}>Detail Pembayaran</p>
          <div className={styles.box10}>
            <table style={{ textAlign: 'center', width: '50%' }}>
              <tbody>
                <tr>
                  <td align="left">Total Pesanan</td>
                  <td align="center">:</td>
                  {/* <td align="right">{data && data.tanggal}</td> */}
                </tr>
                <tr>
                  <td align="left">Total Delivery</td>
                  <td align="center">:</td>
                  {/* <td align="right">{data && data.nama_sales}</td> */}
                </tr>
                <tr>
                  <td align="left">Promo</td>
                  <td align="center">:</td>
                  <td align="left">PT. Alternate Farma</td>
                </tr>
                <tr>
                  <td align="left">Penyesuaian Harga</td>
                  <td align="center">:</td>
                  {/* <td align="right">{data.pembeli && data.pembeli.alamat}</td> */}
                </tr>
                <tr>
                  <td align="left">Total Pembayaran</td>
                  <td align="center">:</td>
                  {/* <td align="right">{data.pembeli && data.pembeli.phone}</td> */}
                </tr>
              </tbody>
            </table>
          </div>
        </Row>
        <TableComponent />
      </Card>
      {/* <EditComponent /> */}
    </div>
  );
};

export default PesananDetailComponent;
