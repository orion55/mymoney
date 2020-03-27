import React from 'react';
import moment from 'moment';
import { useFirestore } from 'react-redux-firebase';
import ModalForm from '../ModalForm';

function EditModal(props) {
  const { show, onShow, record } = props;
  const firestore = useFirestore();

  const selectUid = () => '3PfmQHvlkicXruAesEfnvoAVFJz2';

  let defValues = {};

  if (record !== null) {
    defValues = {
      sum: record.sum / 100,
      category: record.category,
      period: moment(record.period, 'DD.MM.YYYY'),
      recipient: record.recipient,
    };
  }


  const param = {
    showModal: show,
    onOk: (values) => {
      const newVal = {
        ...values,
        period: moment(values.period).format('DD.MM.YYYY'),
        uid: selectUid(),
        sum: values.sum * 100,
      };
      firestore.update(`transactions/${record.key}`, newVal);
      onShow();
    },
    onCancel: onShow,
    initialValues: defValues,
    title: 'Редактировать транзакцию',
  };

  return (
    <ModalForm {...param} />
  );
}

export default EditModal;
