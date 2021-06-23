import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import ActionCreatorsThunks from '../store/thunks';

const ActionCreators = { ...ActionCreatorsThunks };

export default () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionCreators, dispatch);
};
