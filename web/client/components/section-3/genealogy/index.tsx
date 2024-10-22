import { ChildrenDto } from "@/types/member";
import { useEffect, useState } from "react";
import Family from "../family";
import { useDispatch, useSelector } from "react-redux";
import {
  clearLastFamily,
  fetchFamilyRequest,
} from "@/redux/slices/familySlice";

const Genealogy = () => {
  const familyIdFirst = process.env.NEXT_PUBLIC_FAMILY_ID_FIRST || "";
  const [dadId, setDadId] = useState("");
  const dispatch = useDispatch();
  const families = useSelector((state: any) => state.families.families);

  const handleAppendFamily = (member: ChildrenDto) => {
    setDadId(member?.dadId);
    if (!member?.familyId) return;
    // clear last family when with father
    if (dadId === member?.dadId) {
      dispatch(clearLastFamily());
    }
    dispatch(fetchFamilyRequest(member.familyId));
  };

  useEffect(() => {
    dispatch(fetchFamilyRequest(familyIdFirst));
  }, []);

  return (
    <ul className="tree">
      {!!families?.length &&
        families.map((item: any, index: number) => (
          <Family
            data={item}
            key={index}
            handleChildren={handleAppendFamily}
            index={index}
          />
        ))}
    </ul>
  );
};

export default Genealogy;
