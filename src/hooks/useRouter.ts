import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';

export default () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const match = useRouteMatch();

  return {
    history,
    location,
    params,
    match,
  };
};
