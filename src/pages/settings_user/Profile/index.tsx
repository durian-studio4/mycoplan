import React from 'react';
import styles from './index.less';

import Table from './Table';

interface Props {}

const ProfilePenggunaComponent: React.FC<Props> = () => {
  return (
    <div>
      <h1>Profile Pengguna</h1>

      <Table />
    </div>
  );
};

export default ProfilePenggunaComponent;
