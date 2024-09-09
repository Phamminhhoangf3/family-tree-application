import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

type ChartPieType = {
  data: DataChartPieType[];
  outerRadius: number;
};

type DataChartPieType = {
  name: string;
  value: number;
};

const ChartPie = ({ data, outerRadius }: ChartPieType) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  if (!data?.length) return null;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={outerRadius}
          fill="#8884d8"
          dataKey="value"
          legendType="line"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          iconType="square"
          layout="horizontal"
          verticalAlign="bottom"
          wrapperStyle={{ bottom: 20 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
export default ChartPie;
