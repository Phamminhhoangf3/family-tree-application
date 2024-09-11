import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AntdBreadcrumb from "~/components/breadcrumnd";
import HeaderLayout from "~/components/layout/header";
import { dataMenu } from "~/components/navbar/dataMenu";
import NavbarNested from "~/components/navbar/nav-bar";
const { Content, Footer } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <NavbarNested data={dataMenu} />
      <Layout>
        <HeaderLayout />
        <Content style={{ margin: "0 16px" }}>
          <AntdBreadcrumb />
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Admin family ©{new Date().getFullYear()} Created by Phạm Minh Hoàng
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
