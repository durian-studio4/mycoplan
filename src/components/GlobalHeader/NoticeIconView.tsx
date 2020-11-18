import React, { useEffect } from 'react';
import { Tag, message } from 'antd';
import styles from './index.less';

import NoticeIcon from '../NoticeIcon';

import useFetch from '@/hooks/useFetch';

interface Props {}

const GlobalHeaderRight: React.FC<Props> = () => {
  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();

  const role = window.localStorage.getItem('role');

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (JSON.parse(String(role))) {
        const user = JSON.parse(String(role))[0] === 'merchant' ? 'merchant' : 'admin';
        return fetchList(`${REACT_APP_ENV}/${user}/notifications/new-orders`);
      }
    }, 0);
    return () => clearTimeout(timeOut);
  }, [role]);

  return (
    <NoticeIcon
      className={styles.action}
      count={data_list.length || 0}
      // onItemClick={(item) => {
      //   this.changeReadState(item as NoticeItem);
      // }}
      loading={Boolean(loading_list)}
      // onClear={this.handleNoticeClear}
      // onPopupVisibleChange={onNoticeVisibleChange}
      onViewMore={() => message.info('Click on view more')}
      clearClose
    >
      <NoticeIcon.Tab list={data_list.reverse()} count={data_list} title="Notifikasi" />
    </NoticeIcon>
  );
};

export default GlobalHeaderRight;
