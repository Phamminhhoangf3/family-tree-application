import dayjs from "dayjs";

const CommonDate = {
  formatBirthAndDeath: (from: string, to: string | undefined) => {
    if (!from && !to) return "";
    if (!from && to) return "";
    if (from && !to) return dayjs(from).format("YYYY");
    return `${dayjs(from).format("YYYY")} - ${dayjs(to).format("YYYY")}`;
  },
};

export default CommonDate;
