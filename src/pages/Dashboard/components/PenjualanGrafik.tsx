import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import moment from 'moment';
import { format } from 'date-fns';
import styles from '../style.less';

import { Bar } from './Charts';

import { PermissionContext } from '@/layouts/context';

import PageLoading from '@/components/PageLoading';
import PageError from '@/components/PageError';

import useFetch from '@/hooks/useFetch';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const rankingListData: { title: string; total: number }[] = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: formatMessage({ id: 'dashboard.analysis.test' }, { no: i }),
    total: 323234,
  });
}

let initialDate = new Date();
let y = initialDate.getFullYear();
let m = initialDate.getMonth();
let firstDay = format(new Date(y, m, 1), 'yyyy-MM-dd');
let lastDay = format(new Date(y, m + 1, 0), 'yyyy-MM-dd');

const GrafikPenjualanComponent = () => {
  const context = useContext(PermissionContext);

  const dashboard_access = context && context[0];

  const [rangePickerValue, setRangePickerValue] = useState([firstDay, lastDay]);
  const [category, setCategory] = useState('day');

  const [data_chart, status_chart, loading_chart, error_chart, fetchChart] = useFetch();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchChart(
        `${REACT_APP_ENV}/admin/dashboard/transactions/chart?category=${category}&start_date=${rangePickerValue[0]}&end_date=${rangePickerValue[1]}`,
      );
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, rangePickerValue]);

  const handleRangePickerChange = (dateString: any, date: any) => {
    setRangePickerValue([date[0], date[1]]);
  };

  const selectDate = (type: 'day' | 'week' | 'month' | 'year') => {
    setCategory(type);
  };

  const isActive = (type: 'day' | 'week' | 'month' | 'year') => {
    if (!category) {
      return '';
    }
    if (category === type) {
      return styles.currentDate;
    }
  };

  let data_array = [];

  for (let key in data_chart) {
    data_array.push({
      x: data_chart[key].date,
      y: data_chart[key].value,
    });
  }

  return (
    <Card
      bordered={false}
      bodyStyle={{ padding: 0 }}
      style={{ display: dashboard_access && dashboard_access.read ? 'block' : 'none' }}
    >
      {status_chart !== 200 || error_chart ? <PageError /> : null}
      {Boolean(loading_chart) ? (
        <PageLoading />
      ) : (
        <div className={styles.salesCard}>
          <Tabs
            tabBarExtraContent={
              <div className={styles.salesExtraWrap}>
                <div className={styles.salesExtra}>
                  <a className={isActive('day')} onClick={() => selectDate('day')}>
                    <FormattedMessage id="harian" defaultMessage="Harian" />
                  </a>
                  <a className={isActive('week')} onClick={() => selectDate('week')}>
                    <FormattedMessage id="mingguan" defaultMessage="Mingguan" />
                  </a>
                  <a className={isActive('month')} onClick={() => selectDate('month')}>
                    <FormattedMessage id="bulanan" defaultMessage="Bulanan" />
                  </a>
                  <a className={isActive('year')} onClick={() => selectDate('year')}>
                    <FormattedMessage id="tahunan" defaultMessage="Tahunan" />
                  </a>
                </div>
                <RangePicker
                  onChange={handleRangePickerChange}
                  defaultValue={[moment(rangePickerValue[0]), moment(rangePickerValue[1])]}
                  style={{ width: 256 }}
                />
              </div>
            }
            size="large"
            tabBarStyle={{ marginBottom: 24 }}
          >
            <TabPane
              tab={<FormattedMessage id="grafik-penjualan" defaultMessage="Grafik Penjualan" />}
              key="pengguna"
            >
              <Row>
                <div style={{ width: '100%' }}>
                  <div className={styles.salesBar}>
                    <Bar
                      height={295}
                      title={
                        <FormattedMessage
                          id="total-semua-penjualan"
                          defaultMessage="Total Semua Penjualan"
                        />
                      }
                      data={data_array}
                    />
                  </div>
                </div>
              </Row>
            </TabPane>
          </Tabs>
        </div>
      )}
    </Card>
  );
};

export default GrafikPenjualanComponent;

{
  /* <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesRank}>
                <h4 className={styles.rankingTitle}>
                  <FormattedMessage
                    id="dashboard.analysis.sales-ranking"
                    defaultMessage="Sales Ranking"
                  />
                </h4>
                <ul className={styles.rankingList}>
                  {rankingListData.map((item, i) => (
                    <li key={item.title}>
                      <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                        {i + 1}
                      </span>
                      <span className={styles.rankingItemTitle} title={item.title}>
                        {item.title}
                      </span>
                      <span className={styles.rankingItemValue}>
                        {numeral(item.total).format('0,0')}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Col> */
}
