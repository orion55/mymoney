import React from 'react';
import moment from 'moment';
import { useFirestore } from 'react-redux-firebase';
import ModalForm from '../ModalForm';

function AddModal(props) {
  const { show, onShow } = props;
  const firestore = useFirestore();

  const param = {
    showModal: show,
    onOk: (values) => {
      console.log(values);
      // firestore.add('transactions', values);
      onShow();
    },
    onCancel: onShow,
    initialValues: {
      sum: 0,
      category: '',
      period: moment(),
      recipient: '',
    },
    title: 'Добавить транзакцию',
  };
  return (
    <ModalForm {...param} />
  );
}

export default AddModal;
