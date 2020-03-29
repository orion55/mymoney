import React, { useState } from 'react';
import {
  Table, Button, Popconfirm, Spin, Alert,
} from 'antd';
import { EditOutlined, CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import './style.css';
import 'firebase/database';
import Amount from 'arui-feather/amount';
import { useSelector } from 'react-redux';
import {
  useFirestoreConnect, isLoaded, isEmpty, useFirestore,
} from 'react-redux-firebase';
import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import EditModal from '../Modal/EditModal';

function ListPayments() {
  const [show, setShow] = useState(false);
  const [record, setRecord] = useState(null);
  const [keyRecord, setKeyRecord] = useState(_.uniqueId());

  useFirestoreConnect('transactions');
  const transactions = useSelector((state) => state.firestore.data.transactions);
  const users = useSelector((state) => state.firestore.data.users);
  const searchText = useSelector((state) => state.search);
  const auth = useSelector((state) => state.firebase.auth);
  const firestore = useFirestore();

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
              setKeyRecord(_.uniqueId());
              setShow(true);
            }}
          />
          <Popconfirm
            title="Удалить запись?"
            onConfirm={() => firestore.delete(`transactions/${curRecord.key}`)}
            cancelText="Отмена"
            icon={(<QuestionCircleOutlined style={{ color: 'red' }} />)}
          >
            <Button type="link" icon={<CloseOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const param = {
    show,
    onShow: () => setShow(false),
  };

  if (!isLoaded(transactions)) {
    return (
      <div className="spin">
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

  const selectUid = () => auth.uid;
  const selectTrans = (state) => _(state)
    .map((obj, key) => ({ ...obj, key }))
    .sortBy('period')
    .reverse()
    .value();

  const selectVisibleData = createSelector(
    [selectUid, selectTrans],
    (uid, state) => _.filter(state, (obj) => obj.uid === uid),
  );

  const searchFunc = () => searchText;

  const selectSearchData = createSelector(
    [searchFunc, selectVisibleData],
    (text, state) => {
      if (text === '') {
        return state;
      }
      const textLow = text.toLowerCase();

      const result01 = _.filter(state,
        (obj) => obj.category.toLowerCase().indexOf(textLow) !== -1);

      const result02 = _.filter(state, (obj) => {
        const newSum = Math.trunc(obj.sum / 100);
        return newSum.toString().indexOf(textLow) !== -1;
      });

      const result03 = _.filter(state,
        (obj) => obj.recipient.toLowerCase().indexOf(textLow) !== -1);

      return _.unionWith(result01, result02, result03, _.isEqual);
    },
  );

  const curUser = () => {
    const user = _(users)
      .map((obj, key) => ({ ...obj, key }))
      .filter((obj) => obj.uid === selectUid())
      .value();
    if (user.length !== 0) {
      return user[0];
    }
    return [];
  };

  const totalCalc = createSelector(
    [curUser, selectVisibleData],
    (user, trans) => {
      const total = _.reduce(trans, (sum, obj) => sum + obj.sum, 0);
      if (total !== user.total) {
        firestore.update(`users/${user.key}`, { total });
      }
      return total;
    },
  );

  totalCalc(transactions);

  return (
    <>
      <EditModal {...param} record={record} key={keyRecord} />
      <Table columns={columns} dataSource={selectSearchData(transactions)} pagination={false} />
    </>
  );
}

export default ListPayments;
