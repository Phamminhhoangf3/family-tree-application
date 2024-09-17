import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CommonDate from "@/utils/common-date";
import LazyImage from "./lazyImage";

export type MemberCardType = {
  title: "husband" | "wife" | "ex-Wife" | "son";
  data: any;
  handleChildren?: (data: any) => void | undefined;
  selected?: boolean;
};

const MemberCard = ({
  data,
  handleChildren,
  title,
  selected = false,
}: MemberCardType) => {
  return (
    <div className="member-card">
      <div className="tag">{title}</div>
      <div className="avatar">
        <LazyImage src={data?.image} width={280} height={280} />
      </div>
      <div className={"information" + (selected ? " selected" : "")}>
        <div className="full-name">
          <strong>{data?.name}</strong>
        </div>
        <div className="date">
          {CommonDate.formatBirthAndDeath(data?.fromDob, data?.toDob)}
        </div>
      </div>
      {!!handleChildren && !!data?.familyId && (
        <button
          className="btn-add"
          onClick={() => {
            handleChildren(data);
          }}
        >
          <AccountTreeIcon sx={{ color: "rgb(171, 35, 17)" }} />
        </button>
      )}
    </div>
  );
};

export default MemberCard;
