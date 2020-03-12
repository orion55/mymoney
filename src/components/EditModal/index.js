import React from 'react';
import moment from 'moment';
import ModalForm from '../ModalForm';

function EditModal(props) {
  const { show, onShow, record } = props;

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
      console.log(values);
      console.log(record.key);
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
