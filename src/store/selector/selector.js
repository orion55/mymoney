import { createSelector } from 'reselect';
import _ from 'lodash';

function selectVis(selectUid, selectTrans) {
  return createSelector(
    [selectUid, selectTrans],
    (uid, state) => _.filter(state, (obj) => obj.uid === uid),
  );
}

function selectSearch(searchFunc, selectVisibleData) {
  return createSelector(
    [searchFunc, selectVisibleData],
    (text, state) => {
      if (text === '') {
        return state;
      }
      const textLow = text.toLowerCase();

      const result01 = _.filter(
        state,
        (obj) => obj.category.toLowerCase().indexOf(textLow) !== -1,
      );

      const result02 = _.filter(state, (obj) => {
        const newSum = Math.trunc(obj.sum / 100);
        return newSum.toString().indexOf(textLow) !== -1;
      });

      const result03 = _.filter(
        state,
        (obj) => obj.recipient.toLowerCase().indexOf(textLow) !== -1,
      );

      return _.unionWith(result01, result02, result03, _.isEqual);
    },
  );
}

function totalCalcFunc(curUser, selectVisibleData, firestore) {
  return createSelector(
    [curUser, selectVisibleData],
    (user, trans) => {
      const total = _.reduce(trans, (sum, obj) => sum + obj.sum, 0);
      if (!_.isEmpty(user) && total !== user.total) {
        firestore.update(`users/${user.key}`, { total });
      }
      return total;
    },
  );
}

export { selectVis, selectSearch, totalCalcFunc };
