import { ChildrenDto } from "@/types/member";
import MemberCard, { MemberCardType } from "../../member";
import { groupByThree } from "@/utils";

type ChildrenType = {
  data: ChildrenDto[];
  handleChildren: (data: any) => void;
};

const Children = ({ data, handleChildren }: ChildrenType) => {
  const groupChildren = !!data?.length ? groupByThree(data) : [];
  const title = { male: "son", female: "daughter" };
  const renderTitle = (children: ChildrenDto) => title[children?.gender];

  return (
    <>
      {groupChildren.map((listChildren, index) => (
        <ul className={index !== 0 ? "row-three" : ""} key={index}>
          <div className="row">
            {!!listChildren?.length &&
              listChildren.map((child, i) => (
                <li
                  className={i === 0 ? "first" : "not-first"}
                  key={child?._id}
                >
                  <div className={"sticky children" + (i == 0 ? " next" : "")}>
                    <MemberCard
                      title={renderTitle(child) as MemberCardType["title"]}
                      data={child}
                      handleChildren={handleChildren}
                    />
                  </div>
                </li>
              ))}
          </div>
        </ul>
      ))}
    </>
  );
};

export default Children;
