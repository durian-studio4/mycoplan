import React, { useContext, useEffect, Fragment } from 'react';
import { Col, Row } from 'antd';
import { FormattedMessage } from 'umi';
import numeral from 'numeral';
import { PermissionContext } from '@/layouts/context';

import { ChartCard } from './Charts';

import useFetch from '@/hooks/useFetch';

import PageError from '@/components/PageError';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const TotalPenggunaComponent = () => {
  const context = useContext(PermissionContext);

  const dashboard_access = context && context[0];

  const [data_total, status_total, loading_total, error_total, fetchTotal] = useFetch();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchTotal(`${REACT_APP_ENV}/admin/dashboard/users/registered`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row
      gutter={24}
      style={{ display: dashboard_access && dashboard_access.read ? 'flex' : 'none' }}
    >
      {status_total !== 200 || error_total ? <PageError /> : null}
      <Fragment>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title={<FormattedMessage id="total-semua" defaultMessage="Total Semua Pengguna" />}
            total={numeral(Number(data_total.total)).format('0,0')}
            contentHeight={46}
            loading={Boolean(loading_total)}
          />
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title={
              <FormattedMessage id="total-pengguna-google" defaultMessage="Total Pengguna Google" />
            }
            total={numeral(Number(data_total.google)).format('0,0')}
            contentHeight={46}
            loading={Boolean(loading_total)}
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
            total={numeral(Number(data_total.facebook)).format('0,0')}
            contentHeight={46}
            loading={Boolean(loading_total)}
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
            total={numeral(Number(data_total.email)).format('0,0')}
            contentHeight={46}
            loading={Boolean(loading_total)}
          >
            {/* <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" /> */}
          </ChartCard>
        </Col>
      </Fragment>
    </Row>
  );
};

export default TotalPenggunaComponent;
