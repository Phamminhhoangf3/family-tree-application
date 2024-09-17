import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { paths } from "~/constants/path";
import Login from "~/pages/auth/login";
import MainLayout from "~/layout/main-layout";
import { useAuth } from "~/authProvider";
import AuthLayout from "~/layout/auth";
import React from "react";

const Home = React.lazy(() => import("~/pages/home"));
const Members = React.lazy(() => import("~/pages/members"));
const Users = React.lazy(() => import("~/pages/users"));
const Family = React.lazy(() => import("~/pages/family"));
const DetailFamily = React.lazy(() => import("~/pages/family/detail"));
const DetailMember = React.lazy(() => import("~/pages/members/detail"));
const DetailUser = React.lazy(() => import("~/pages/users/detail"));

const RejectedRoute = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={paths.users} replace />;
  }
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

const Root = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={paths.users} replace />;
  } else {
    return <Navigate to={paths.Login} replace />;
  }
};

export default function RouteElements() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/auth" element={<RejectedRoute />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/admin" element={<MainLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="user">
            <Route index element={<Users />} />
            <Route path="add" element={<DetailUser typePage="add" />} />
            <Route path="view/:id" element={<DetailUser typePage="detail" />} />
            <Route
              path="update/:id"
              element={<DetailUser typePage="update" />}
            />
          </Route>
          <Route path="members">
            <Route index element={<Members />} />
            <Route path="add" element={<DetailMember typePage="add" />} />
            <Route
              path="view/:id"
              element={<DetailMember typePage="detail" />}
            />
            <Route
              path="update/:id"
              element={<DetailMember typePage="update" />}
            />
          </Route>
          <Route path="family">
            <Route index element={<Family />} />
            <Route path="add" element={<DetailFamily typePage="add" />} />
            <Route
              path="view/:id"
              element={<DetailFamily typePage="detail" />}
            />
            <Route
              path="update/:id"
              element={<DetailFamily typePage="update" />}
            />
          </Route>
        </Route>
      </Routes>
    </React.Suspense>
  );
}
