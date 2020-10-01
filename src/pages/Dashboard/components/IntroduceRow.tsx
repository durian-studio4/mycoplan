import React, { useContext } from 'react';
import { Col, Row, Tooltip } from 'antd';
import { FormattedMessage } from 'umi';
import numeral from 'numeral';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from './Charts';
import styles from '../style.less';

import { PermissionContext } from '@/layouts/context';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = () => {
  const context = useContext(PermissionContext);

  const dashboard_access = context && context[0];

  return (
    <Row
      gutter={24}
      style={{ display: dashboard_access && dashboard_access.read ? 'flex' : 'none' }}
    >
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title={<FormattedMessage id="total-semua" defaultMessage="Total Semua Pengguna" />}
          total={numeral(1000).format('0,0')}
          contentHeight={46}
        />
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title={
            <FormattedMessage id="total-pengguna-google" defaultMessage="Total Pengguna Google" />
          }
          total={numeral(600).format('0,0')}
          contentHeight={46}
        >
          {/* <MiniArea color="#975FE4" data={visitData} /> */}
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title={
            <FormattedMessage
              id="total-pengguna-facebook"
              defaultMessage="Total Pengguna Facebook"
            />
          }
          total={numeral(300).format('0,0')}
          contentHeight={46}
        >
          {/* <MiniBar data={visitData} /> */}
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title={
            <FormattedMessage id="total-pengguna-email" defaultMessage="Total Pengguna Email" />
          }
          total={numeral(100).format('0,0')}
          contentHeight={46}
        >
          {/* <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" /> */}
        </ChartCard>
      </Col>
    </Row>
  );
};

export default IntroduceRow;
