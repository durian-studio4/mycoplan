import React from 'react';
import { Card, Radio } from 'antd';
import { FormattedMessage } from 'umi';
import { Pie } from './Charts';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const ProportionSales = () => (
  <Card
    className={styles.salesCard}
    bordered={false}
    title={<FormattedMessage id="pengguna" defaultMessage="Pengguna Berdasarkan Jenis Kelamin" />}
    style={{
      height: '100%',
    }}
  >
    <div>
      <h4 style={{ marginTop: 8, marginBottom: 32 }}>
        <FormattedMessage id="pengguna" defaultMessage="Pengguna" />
      </h4>
      <Pie
        hasLegend
        subTitle={<FormattedMessage id="pengguna" defaultMessage="Pengguna" />}
        // total={() => <Yuan>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>}
        // data={salesPieData}
        valueFormat={(value) => <Yuan>{value}</Yuan>}
        height={248}
        lineWidth={4}
      />
    </div>
  </Card>
);

export default ProportionSales;
