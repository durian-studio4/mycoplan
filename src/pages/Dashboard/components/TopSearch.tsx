import { InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row, Table, Tooltip } from 'antd';
import { FormattedMessage } from 'umi';
import React from 'react';
import numeral from 'numeral';
import { SearchDataType, VisitDataType } from '../data.d';

import { MiniArea } from './Charts';
import NumberInfo from './NumberInfo';
import Trend from './Trend';
import styles from '../style.less';

const columns = [
  {
    align: 'center',
    title: <FormattedMessage id="no" defaultMessage="No." />,
  },
  {
    align: 'center',
    title: <FormattedMessage id="age" defaultMessage="Usia" />,
  },
  {
    align: 'center',
    title: <FormattedMessage id="total" defaultMessage="Jumlah" />,
  },
];

const TopSearch = () => (
  <Card
    bordered={false}
    title={<FormattedMessage id="pengguna" defaultMessage="Pengguna Berdasarkan Usia" />}
    style={{
      height: '100%',
    }}
  >
    <Table<any>
      rowKey={(record) => record.index}
      size="small"
      columns={columns}
      // dataSource={searchData}
      pagination={{
        style: { marginBottom: 0 },
        pageSize: 5,
      }}
    />
  </Card>
);

export default TopSearch;
