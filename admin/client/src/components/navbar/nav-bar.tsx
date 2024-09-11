import { Menu, Typography } from "antd";
import type { MenuProps } from "antd";
import { useState } from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { dataMenuType } from "./dataMenu";

const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

type NavbarNestedProps = {
  data: dataMenuType[];
};

const { Title } = Typography;

const NavbarNested: React.FC<NavbarNestedProps> = ({ data }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const items: MenuItem[] = data.map((item) => ({
    key: item.url,
    label: item.label,
    icon: item.icon,
  }));

  const onClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Title className="!text-white text-center my-6">Family</Title>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        onClick={onClick}
      />
    </Sider>
  );
};
export default NavbarNested;
