import React from 'react';
import moment from 'moment';
import { useFirestore } from 'react-redux-firebase';
import ModalForm from '../ModalForm';

function AddModal(props) {
  const { show, onShow } = props;
  const firestore = useFirestore();
  const selectUid = () => '3PfmQHvlkicXruAesEfnvoAVFJz2';

  const param = {
    showModal: show,
    onOk: (values) => {
      const newVal = {
        ...values,
        period: moment(values.period).format('DD.MM.YYYY'),
        uid: selectUid(),
        sum: values.sum * 100,
      };
      firestore.add('transactions', newVal);
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
