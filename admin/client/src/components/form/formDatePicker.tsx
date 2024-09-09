import { DatePicker, Typography } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import { PickerProps } from "antd/es/date-picker/generatePicker";
interface FormDatePickerType extends PickerProps {
  label: string;
}

const dateFormat = "DD/MM/YYYY";
const FormDatePicker = ({ label, ...rest }: FormDatePickerType) => {
  return (
    <>
      <Typography.Text>{label}</Typography.Text>
      <DatePicker
        locale={locale}
        style={{ width: "100%" }}
        format={dateFormat}
        {...rest}
      />
    </>
  );
};

export default FormDatePicker;
