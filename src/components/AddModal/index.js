import React from 'react';
import moment from 'moment';
import ModalForm from '../ModalForm';

function AddModal(props) {
  const { show, onShow } = props;

  const param = {
    showModal: show,
    onOk: (values) => {
      console.log(values);
      onShow();
    },
    onCancel: onShow,
    initialValues: {
      sum: 0,
      category: '',
      period: moment(),
      recipient: '',
    },
  };
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ModalForm {...param} />
  );
}

export default AddModal;
