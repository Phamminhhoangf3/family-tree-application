import { Card, Col, Flex, Row, Typography } from "antd";
import ChartPie from "~/components/chart/ChartPie";
import { ENDPOINTS } from "~/constants/common";
import { useFetchData } from "~/hook/useFetchData";

const { Text, Title } = Typography;
const Home = () => {
  const renderTotal = (value) => (
    <Flex justify="space-between">
      <Title level={4}>{value || null}</Title>
    </Flex>
  );

  const { data } = useFetchData({
    endpoint: ENDPOINTS.dashboard,
  });

  const cardData = [
    {
      key: 1,
      title: "Tổng số gia đình",
      value: renderTotal(data?.totalFamily),
      span: 6,
    },
    {
      key: 2,
      title: "Tổng số thành viên",
      value: renderTotal(data?.totalMember),
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
          <ChartPie data={data?.genderRatio} outerRadius={70} />
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
                <Text>{item.title}</Text>
                {item?.value || null}
              </Card>
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
