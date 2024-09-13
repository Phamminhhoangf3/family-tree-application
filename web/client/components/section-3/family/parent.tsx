import { FamilyDto } from "@/types/member";
import MemberCard from "../../member";

type ParentType = {
  data: FamilyDto;
};

const Parent = ({ data }: ParentType) => {
  const renderClass = (family: FamilyDto) => {
    let result = ["sticky"];
    if (family?.husband && family?.wife) result.push("line");
    if (!!family?.children?.length) result.push("parent");
    return result.join(" ");
  };

  return (
    <div className="row">
      {data?.husband && (
        <div className={renderClass(data)}>
          <MemberCard data={data.husband} title="husband" selected />
        </div>
      )}
      {!!data?.wife && (
        <div className="sticky">
          <MemberCard data={data.wife} title="wife" />
        </div>
      )}
      {!!data?.exWife && (
        <div className="sticky">
          <MemberCard data={data.exWife} title="ex-Wife" />
        </div>
      )}
    </div>
  );
};

export default Parent;
