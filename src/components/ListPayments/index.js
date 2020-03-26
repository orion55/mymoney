import React, { useState } from 'react';
import {
  Table, Button, Popconfirm, Spin, Alert,
} from 'antd';
import { EditOutlined, CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import './style.css';
import 'firebase/database';
import Amount from 'arui-feather/amount';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import moment from 'moment';
import EditModal from '../EditModal';

function ListPayments() {
  const [show, setShow] = useState(false);
  const [record, setRecord] = useState(null);

  useFirestoreConnect('transactions');
  const transactions = useSelector((state) => state.firestore.data.transactions);

  const columns = [
    {
      title: 'Дата',
      dataIndex: 'period',
      sorter: {
        compare: (a, b) => {
          const dateA = new Date(a.period);
          const dateB = new Date(b.period);
          return dateA - dateB;
        },
        multiple: 3,
      },
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      sorter: {
        compare: (a, b) => {
          const nameA = a.category.toLowerCase();
          const nameB = b.category.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        },
        multiple: 2,
      },
    },
    {
      title: 'Сумма',
      dataIndex: 'sum',
      sorter: {
        compare: (a, b) => a.sum - b.sum,
        multiple: 1,
      },
      render: (val) => (
        <div className="list__sum">
          <Amount size="s" amount={{ value: val, currency: { code: 'RUR', minority: 100 } }} className="" showZeroMinorPart />
        </div>
      ),
    },
    {
      title: 'Получатель',
      dataIndex: 'recipient',
      sorter: {
        compare: (a, b) => {
          const nameA = a.recipient.toLowerCase();
          const nameB = b.recipient.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        },
        multiple: 4,
      },
    },
    {
      title: 'Действия',
      dataIndex: 'action',
      render: (text, curRecord) => (
        <div>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setRecord(curRecord);
              setShow(true);
            }}
          />
          <Popconfirm title="Удалить запись?" onConfirm={() => console.log(curRecord.key)} cancelText="Отмена" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
            <Button type="link" icon={<CloseOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const param = {
    show,
    onShow: () => setShow(false),
    record,
    key: record == null ? 0 : record.key,
  };

  if (!isLoaded(transactions)) {
    return (
      <div className="list__spin">
        <Spin />
      </div>
    );
  }

  if (isEmpty(transactions)) {
    return (
      <div className="list__spin">
        <Alert message="Список транзакций пуст" type="error" />
      </div>
    );
  }

  const selectUid = () => '3PfmQHvlkicXruAesEfnvoAVFJz2';
  const selectTrans = (state) => _.map(state, (obj, key) => ({ ...obj, key, period: moment().format('DD.MM.YYYY') }));

  const selectVisibleData = createSelector(
    [selectUid, selectTrans],
    (uid, state) => _.filter(state, (obj) => obj.uid === uid),
  );

  // console.log(transactions);
  /*
  console.log(selectTrans(transactions));
  console.log(selectVisibleData(transactions));
*/
  return (
    <>
      <EditModal {...param} />
      <Table columns={columns} dataSource={selectVisibleData(transactions)} pagination={false} />
    </>
  );
}

export default ListPayments;
