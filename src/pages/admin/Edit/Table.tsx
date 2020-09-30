import React, { useMemo, useState, useEffect } from 'react';
import { Table, Checkbox } from 'antd';

import PageError from '@/components/PageError';

interface Props {
  data: any;
  loading: boolean;
  status: any;
  error: any;
  onLoad: boolean;
  onUpdate: ({ json }: any) => void;
}

interface Permission {
  id: number;
  id_admin: number;
  id_admin_menu: number;
  create: number;
  read: number;
  update: number;
  delete: number;
  created_at: string;
  updated_at: string;
  admin_menu: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  admin: {
    id: number;
    email: string;
    name: string;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
}

const TableComponent: React.FC<Props> = ({ data, loading, status, error, onLoad, onUpdate }) => {
  // const [getColumnSearchProps] = useFilterColumn();
  const [permission, setPermission] = useState<Permission[]>([]);

  useEffect(() => {
    if (data) {
      data &&
        data.map((data: any) =>
          setPermission((state) => [
            ...state,
            {
              id: data.id,
              id_admin: data.id_admin,
              id_admin_menu: data.id_admin_menu,
              create: data.create,
              read: data.read,
              update: data.update,
              delete: data.delete,
              created_at: data.created_at,
              updated_at: data.updated_at,
              admin_menu: {
                id: data.admin_menu.id,
                name: data.admin_menu.name,
                created_at: data.admin_menu.created_at,
                updated_at: data.admin_menu.updated_at,
              },
              admin: {
                id: data.admin.id,
                email: data.admin.email,
                name: data.admin.name,
                role: data.admin.role,
                status: data.admin.status,
                created_at: data.admin.created_at,
                updated_at: data.admin.updated_at,
              },
            },
          ]),
        );
    }
  }, [data]);

  const onChangeCreate = (e: any, i: number) => {
    const { checked } = e.target;
    const state = [...permission];
    state[i].create = Number(checked);
    onUpdate({
      json: JSON.stringify({ data: state }),
    });
  };

  const onChangeRead = (e: any, i: number) => {
    const { checked } = e.target;
    const state = [...permission];
    state[i].read = Number(checked);
    onUpdate({
      json: JSON.stringify({ data: state }),
    });
  };

  const onChangeUpdate = (e: any, i: number) => {
    const { checked } = e.target;
    const state = [...permission];
    state[i].update = Number(checked);
    onUpdate({
      json: JSON.stringify({ data: state }),
    });
  };

  const onChangeDelete = (e: any, i: number) => {
    const { checked } = e.target;
    const state = [...permission];
    state[i].delete = Number(checked);
    onUpdate({
      json: JSON.stringify({ data: state }),
    });
  };

  let data_array = [];

  for (let key in data) {
    data_array.push({
      no: Number(key) + 1,
      key,
      id: data[key].id,
      halaman: data[key].admin_menu.name,
      create: data[key].create,
      read: data[key].read,
      update: data[key].update,
      delete: data[key].delete,
    });
  }

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'No',
        dataIndex: 'no',
        key: 'no',
      },
      {
        align: 'left',
        title: 'Halaman',
        dataIndex: 'halaman',
        key: 'halaman',
      },
      {
        align: 'center',
        title: 'Create',
        key: 'create',
        render: (props: any) => (
          <Checkbox
            onChange={(e) => onChangeCreate(e, props.key)}
            checked={Boolean(props.create)}
            disabled={onLoad}
          />
        ),
      },
      {
        align: 'center',
        title: 'Read',
        key: 'read',
        render: (props: any) => (
          <Checkbox
            onChange={(e) => onChangeRead(e, props.key)}
            checked={Boolean(props.read)}
            disabled={onLoad}
          />
        ),
      },
      {
        align: 'center',
        title: 'Update',
        key: 'update',
        render: (props: any) => (
          <Checkbox
            onChange={(e) => onChangeUpdate(e, props.key)}
            checked={Boolean(props.update)}
            disabled={onLoad}
          />
        ),
      },
      {
        align: 'center',
        title: 'Delete',
        key: 'delete',
        render: (props: any) => (
          <Checkbox
            onChange={(e) => onChangeDelete(e, props.key)}
            checked={Boolean(props.delete)}
            disabled={onLoad}
          />
        ),
      },
    ],
    [permission],
  );

  if (error || status !== 200) {
    return <PageError />;
  }

  return (
    <>
      <Table columns={columns} dataSource={data_array} loading={loading} />
    </>
  );
};

export default TableComponent;
