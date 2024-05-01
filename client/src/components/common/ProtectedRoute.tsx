import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserToken } from '../../helpers/tokenHelpers';

interface ProtectedRouteInterface {
  authenticated?: boolean | null;
  children?: ReactElement;
}

function ProtectedRoute(
  props: ProtectedRouteInterface = {
    authenticated: null
  }
) {
  const navigate = useNavigate();

  useEffect(() => {
    if ((props.authenticated !== null && props.authenticated) === true) {
      if (!getCurrentUserToken()) {
        navigate('/');
      }
    }
    if ((props.authenticated !== null && props.authenticated) === false) {
      if (getCurrentUserToken()) {
        navigate('/notes');
      }
    }
  }, []);

  return props.children;
}

export default ProtectedRoute;
