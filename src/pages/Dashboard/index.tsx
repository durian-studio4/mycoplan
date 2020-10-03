import React, { useState, useContext, Suspense } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu, Row } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { RadioChangeEvent } from 'antd/es/radio';
import { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import moment from 'moment';
import { getTimeDistance } from './utils/utils';
import styles from './style.less';

import { PermissionContext } from '@/layouts/context';

import PageLoading from './components/PageLoading';
import PageUnauthorized from '@/components/PageUnauthorized';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const SalesCard = React.lazy(() => import('./components/SalesCard'));
const TopSearch = React.lazy(() => import('./components/TopSearch'));
const ProportionSales = React.lazy(() => import('./components/ProportionSales'));

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

// interface DashboardState {
//   salesType: 'all' | 'online' | 'stores';
//   rangePickerValue: RangePickerValue;
// }

const menu = (
  <Menu>
    <Menu.Item>操作一</Menu.Item>
    <Menu.Item>操作二</Menu.Item>
  </Menu>
);

const dropdownGroup = (
  <span className={styles.iconGroup}>
    <Dropdown overlay={menu} placement="bottomRight">
      <EllipsisOutlined />
    </Dropdown>
  </span>
);

const DashboardComponent: React.FC = () => {
  const context = useContext(PermissionContext);

  const [salesType, setSalesType] = useState('all');
  const [rangePickerValue, setRangePickerValue] = useState(getTimeDistance('year'));

  const handleChangeSalesType = (e: RadioChangeEvent) => {
    setSalesType(e.target.value);
  };

  // const handleTabChange = (key: string) => {
  //   this.setState({
  //     currentTabKey: key,
  //   });
  // };

  const handleRangePickerChange = (rangePickerValue: RangePickerValue) => {
    setRangePickerValue(rangePickerValue);
  };

  const selectDate = (type: 'today' | 'week' | 'month' | 'year') => {
    setRangePickerValue(getTimeDistance(type));
  };

  const isActive = (type: 'today' | 'week' | 'month' | 'year') => {
    if (!rangePickerValue) {
      return '';
    }
    const value = getTimeDistance(type);
    if (!value) {
      return '';
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0] as moment.Moment, 'day') &&
      rangePickerValue[1].isSame(value[1] as moment.Moment, 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  const dashboard_access = context && context[0];

  if (
    dashboard_access &&
    !dashboard_access.read &&
    !dashboard_access.delete &&
    !dashboard_access.update &&
    !dashboard_access.create
  ) {
    return <PageUnauthorized />;
  }

  return (
    <GridContent>
      <React.Fragment>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow />
        </Suspense>
        <Suspense fallback={null}>
          <SalesCard
            rangePickerValue={rangePickerValue}
            isActive={isActive}
            handleRangePickerChange={handleRangePickerChange}
            selectDate={selectDate}
          />
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
              <TopSearch />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <ProportionSales />
            </Suspense>
          </Col>
        </Row>
        <Suspense fallback={null}>
          <SalesCard
            rangePickerValue={rangePickerValue}
            isActive={isActive}
            handleRangePickerChange={handleRangePickerChange}
            selectDate={selectDate}
          />
        </Suspense>
      </React.Fragment>
    </GridContent>
  );
};

export default DashboardComponent;
