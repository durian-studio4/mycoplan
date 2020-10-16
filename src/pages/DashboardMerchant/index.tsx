import React, { Suspense } from 'react';
import { Col, Row } from 'antd';
import { GridContent } from '@ant-design/pro-layout';

import PageLoading from './components/PageLoading';

const TotalPengguna = React.lazy(() => import('./components/PenggunaTotal'));
const GrafikPengguna = React.lazy(() => import('./components/PenggunaGrafik'));
const UsiaPengguna = React.lazy(() => import('./components/PeggunaUsia'));
const GenderPengguna = React.lazy(() => import('./components/PenggunaGender'));

const Penjualan = React.lazy(() => import('./components/PenjualanGrafik'));

const DashboardComponent: React.FC = () => {
  return (
    <GridContent>
      <React.Fragment>
        <Suspense fallback={<PageLoading />}>
          <TotalPengguna />
        </Suspense>
        <Suspense fallback={null}>
          <GrafikPengguna />
        </Suspense>
        <Row
          gutter={24}
          style={{
            marginTop: 24,
            marginBottom: 24,
          }}
        >
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <UsiaPengguna />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <GenderPengguna />
            </Suspense>
          </Col>
        </Row>
        <Suspense fallback={null}>
          <Penjualan />
        </Suspense>
      </React.Fragment>
    </GridContent>
  );
};

export default DashboardComponent;
