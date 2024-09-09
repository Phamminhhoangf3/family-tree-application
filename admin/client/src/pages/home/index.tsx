import { Card, Col, Flex, Row, Typography } from "antd";
import ChartPie from "~/components/chart/ChartPie";

const { Text, Title } = Typography;
const Home = () => {
  const contentText = (value) => (
    <Flex justify="space-between">
      <Title level={4}>{value}</Title>
    </Flex>
  );
  const cardData = [
    {
      key: 1,
      title: "Tổng số gia đình",
      value: contentText(100),
      span: 6,
    },
    {
      key: 2,
      title: "Tổng số thành viên",
      value: contentText(200),
      span: 6,
    },
    {
      key: 3,
      span: 6,
    },
    {
      key: 4,
      span: 6,
    },
    {
      key: 5,
      title: "Tỷ lệ giới tính",
      value: (
        <div className="w-full aspect-square">
          <ChartPie
            data={[
              { name: "Nam", value: 200 },
              { name: "Nữ", value: 280 },
              { name: "Khác", value: 50 },
            ]}
            outerRadius={70}
          />
        </div>
      ),
      span: 6,
    },
  ];
  return (
    <div className="App">
      <Row gutter={[20, 20]}>
        {cardData.map((item) => (
          <Col span={item.span} key={item.key}>
            {item.title && (
              <Card bordered>
                {/* <Space direction="vertical" size="middle" className="w-full"> */}
                <Text>{item.title}</Text>
                {item?.value || null}
                {/* </Space> */}
              </Card>
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
