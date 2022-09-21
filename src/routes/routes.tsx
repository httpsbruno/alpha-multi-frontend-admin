import { ReactElement, useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { UserDataContext } from '../providers/UserDataProvider';
import { Home } from '../pages/Home';
import { Admin } from '../pages/Admin';

interface ChildrenTypes {
  children: ReactElement;
}

const Private = ({ children }: ChildrenTypes) => {
  const userInfo = useContext(UserDataContext);

  if (!userInfo.userLogged) {
    return <Navigate to="/home" />;
  }

  return children;
};

const Public = ({ children }: ChildrenTypes) => {
  const userInfo = useContext(UserDataContext);

  if (userInfo.userLogged) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export const Router = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/home" />} />
    <Route
      path="/home"
      element={
        <Public>
          <Home />
        </Public>
      }
    />
    <Route
      path="/admin"
      element={
        <Private>
          <Admin />
        </Private>
      }
    />
  </Routes>
);
