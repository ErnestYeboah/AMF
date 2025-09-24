import { memo } from "react";
import { Radio } from "antd";
import type { CheckboxGroupProps } from "antd/es/checkbox";
import { useDispatch } from "react-redux";
import { getProductSize } from "../../features/ProductStoreSlice";
const clothing_size_options: CheckboxGroupProps<string>["options"] = [
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "XXL", value: "XXL" },
  { label: "S", value: "S" },
];
const shoes_size_options: CheckboxGroupProps<string>["options"] = [
  { label: "30", value: "30" },
  { label: "35", value: "35" },
  { label: "40", value: "40" },
  { label: "41", value: "41" },
  { label: "42", value: "42" },
  { label: "45", value: "45" },
];

type SizeType = "shoes_size" | "clothing_size";
const SizeList = ({ sizetype = "clothing_size" }: { sizetype: SizeType }) => {
  const dispatch = useDispatch();

  return (
    <>
      {sizetype === "clothing_size" ? (
        <div>
          <p>Select size </p>
          <Radio.Group
            block
            options={clothing_size_options}
            optionType="button"
            buttonStyle="outline"
            className="size_list"
            onChange={(e) => dispatch(getProductSize(e.target.value))}
          />
        </div>
      ) : (
        <div className="">
          <p>Select size </p>
          <Radio.Group
            block
            options={shoes_size_options}
            optionType="button"
            buttonStyle="outline"
            className="size_list"
            onChange={(e) => dispatch(getProductSize(e.target.value))}
          />
        </div>
      )}
    </>
  );
};

export default memo(SizeList);
