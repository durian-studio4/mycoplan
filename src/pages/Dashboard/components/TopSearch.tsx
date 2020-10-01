import { InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row, Table, Tooltip } from 'antd';
import { FormattedMessage } from 'umi';
import React, { useContext } from 'react';
import numeral from 'numeral';
import { SearchDataType, VisitDataType } from '../data.d';

import { MiniArea } from './Charts';
import NumberInfo from './NumberInfo';
import Trend from './Trend';
import styles from '../style.less';

import { PermissionContext } from '@/layouts/context';

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

const TopSearch = () => {
  const context = useContext(PermissionContext);

  const dashboard_access = context && context[0];
  return (
    <Card
      bordered={false}
      title={<FormattedMessage id="pengguna" defaultMessage="Pengguna Berdasarkan Usia" />}
      style={{
        height: '100%',
        display: dashboard_access && dashboard_access.read ? 'flex' : 'none',
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
};

export default TopSearch;
