import { FamilyDto } from "@/types/member";
import Parent from "./parent";
import Children from "./children";

type FamilyType = {
  data: FamilyDto;
  handleChildren: (data: any) => void;
  index: number;
};

const Family = ({ data, handleChildren, index }: FamilyType) => {
  return (
    <li
      className={
        "tree-item" +
        (index % 2 === 0 ? " odd" : " even") +
        (index !== 0 ? " tree-next" : "")
      }
    >
      <div className="container">
        <Parent data={data} />
        <Children data={data?.children} handleChildren={handleChildren} />
      </div>
    </li>
  );
};

export default Family;
