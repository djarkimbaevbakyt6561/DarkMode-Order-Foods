import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import UserLayout from '../layout/UserLayout';
import MealLayout from '../layout/MealLayout';
import GeneralLayout from '../layout/GeneralLayout';
import AdminLayout from '../layout/AdminLayout';
import ProtectedRoutes from './ProtectedRoutes';
import { useSelector } from 'react-redux';
import { USERS_ROLE } from '../constants';
import AdminContainer from '../components/admin/AdminContainer';
const MainRoutes = () => {
  const { role } = useSelector((state) => state.auth.user);
  return (
    <Routes>
      <Route path="/" element={<GeneralLayout />}>
        <Route
          path="signin"
          element={
            <ProtectedRoutes
              component={SignIn}
              isAllowed={['USER', 'GUEST',].includes(role)}
              fallbackPath={role === USERS_ROLE.ADMIN ? '/admin' : "/"}
            />
          }></Route>
        <Route
          path="signup"
          element={
            <ProtectedRoutes
              component={SignUp}
              isAllowed={['USER', 'GUEST',].includes(role)}
              fallbackPath={role === USERS_ROLE.ADMIN ? '/admin' : "/"}
            />
          }></Route>
        <Route
          path="/user/"
          element={
            <ProtectedRoutes
              component={UserLayout}
              isAllowed={['USER', 'GUEST'].includes(role)}
              fallbackPath={'/admin'}
            />
          }
        >
          <Route index element={<MealLayout />} />
        </Route>
        <Route
          path="admin/"
          element={
            <ProtectedRoutes
              component={AdminLayout}
              isAllowed={[USERS_ROLE.ADMIN].includes(role)}
              fallbackPath={role === USERS_ROLE.USER ? "/user/" : "/"}
            />
          }>
      
          <Route path="meals" element={<AdminContainer />}></Route>
        </Route>
      </Route>
      <Route path="*" element={<h1>Not Found This Page</h1>} />
    </Routes >
  );
};

export default MainRoutes;
