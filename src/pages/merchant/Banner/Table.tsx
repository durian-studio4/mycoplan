import React, { useMemo, useCallback, useRef, useState, useEffect } from 'react';
import { Table, Row, Button } from 'antd';
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { format } from 'date-fns';
import styles from './index.less';

import PageError from '@/components/PageError';

interface Props {
  data: any;
  loading: boolean;
  status: number;
  error: any;
  visibleUpdate: (id: string) => void;
  onDelete: (id: string) => void;
  onActive: (id: string) => void;
  onDeactive: (id: string) => void;
}

const RNDContext = createDndContext(HTML5Backend);

const type = 'DragableBodyRow';

const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }: any) => {
  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

const TableComponent: React.FC<Props> = ({
  data,
  loading,
  status,
  error,
  visibleUpdate,
  onActive,
  onDelete,
  onDeactive,
}) => {
  // const [getColumnSearchProps] = useFilterColumn();
  const [data_banner, setData] = useState([]);
  const manager = useRef(RNDContext);

  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  useEffect(() => {
    let data_array = [];
    if (data) {
      for (let key in data) {
        data_array.push({
          no: Number(key) + 1,
          id: data[key].id,
          name: data[key].name,
          title: data[key].title,
          description: data[key].description,
          start: data[key].start,
          end: data[key].end,
          terms_conditions: data[key].terms_conditions,
          image: data[key].image,
          promo: data[key].voucher.code,
          status: data[key].status,
        });
      }
      setData([...data_array]);
    }
  }, [data]);

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = data_banner[dragIndex];
      setData(
        update(data_banner, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
    },
    [data_banner],
  );

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'No.',
        dataIndex: 'no',
        key: 'no',
      },
      {
        align: 'center',
        title: 'Gambar',
        width: 200,
        render: (props) => (
          <img
            alt={`gambar_banner-${props.id}`}
            style={{ width: '100%', height: '100%' }}
            src={props.image}
          />
        ),
        key: 'image',
      },
      {
        align: 'center',
        title: 'Judul Banner Merchant',
        dataIndex: 'title',
        key: 'title',
      },
      {
        align: 'left',
        title: 'Deskripsi Banner',
        dataIndex: 'description',
        key: 'description',
      },
      {
        align: 'center',
        title: 'Waktu Mulai',
        dataIndex: 'start',
        render: (props) => <div>{format(new Date(props), 'dd-MM-yyyy')}</div>,
      },
      {
        align: 'center',
        title: 'Waktu Akhir',
        dataIndex: 'end',
        render: (props) => <div>{format(new Date(props), 'dd-MM-yyyy')}</div>,
      },
      {
        align: 'center',
        title: 'Syarat & Ketentuan',
        dataIndex: 'terms_conditions',
        key: 'terms_conditions',
      },
      {
        align: 'center',
        title: 'Kode Promo',
        dataIndex: 'promo',
        key: 'promo',
      },
      // {
      //   align: 'center',
      //   title: 'Tipe Banner',
      //   key: 'banner',
      //   dataIndex: 'tipe_banner',
      // },
      {
        align: 'center',
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        align: 'center',
        title: 'Action',
        render: (props: any) => (
          <Row justify="center">
            <Button
              className={styles.button_edit}
              id={props.id}
              onClick={() => visibleUpdate(props.id)}
              type="primary"
            >
              Edit
            </Button>
            {props.status === 'active' ? (
              <Button
                className={styles.button_action}
                id={props.id}
                onClick={() => onDeactive(props.id)}
                type="primary"
              >
                Deactivate
              </Button>
            ) : (
              <Button
                className={styles.button_action}
                id={props.id}
                onClick={() => onActive(props.id)}
                type="primary"
              >
                Activate
              </Button>
            )}
            <Button
              className={styles.button_action}
              id={props.id}
              onClick={() => onDelete(props.id)}
              type="primary"
              danger
            >
              Delete
            </Button>
          </Row>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (error || status !== 200) {
    return <PageError />;
  }

  return (
    <DndProvider manager={manager.current.dragDropManager}>
      <Table
        columns={columns}
        loading={loading}
        dataSource={data_banner}
        components={components}
        onRow={(record, index) => ({
          index,
          moveRow,
        })}
      />
    </DndProvider>
  );
};

export default TableComponent;
