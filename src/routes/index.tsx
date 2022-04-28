import { Suspense, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import { Loading } from '@src/common/components/Loading';
import { useAuthUser } from '@src/common/hooks/useAuthUser';
import { AppNotificationSnackbars } from '@src/features/appNotifications/components/AppNotificationSnackbars';
import { useResetAppNotifications } from '@src/features/appNotifications/hooks/useAppNotifications';
import { Common } from '@src/pages/Common';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

function RoutesWithAuth() {
  const authUser = useAuthUser();
  const resetAppNotifications = useResetAppNotifications();

  useEffect(() => {
    resetAppNotifications();
  }, [authUser, resetAppNotifications]);

  const commonRoutes = [{ path: '/common', element: <Common /> }];
  const routes = authUser ? protectedRoutes : publicRoutes;
  const element = useRoutes([...routes, ...commonRoutes]);

  return element;
}

export function AppRoutes() {
  return (
    <Suspense fallback={Loading()}>
      <RoutesWithAuth />
      <AppNotificationSnackbars
        option={{
          stackDirection: 'bottom',
          max: 10,
          space: 10,
          snackbarOption: {
            open: true,
            autoHideDuration: 6000,
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          },
        }}
      />
    </Suspense>
  );
}
