import React from "react";
import { Button } from "antd";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import "./SortFilter.css";

function SortFilter(props) {
  const { isSortAscending = true, setIsSortAscending = () => {} } = props;

  const setAscending = () => {
    setIsSortAscending(true);
  };

  const setDescending = () => {
    setIsSortAscending(false);
  };

  return (
    <div className="sort-filter">
      <Button
        type="secondary"
        shape="circle"
        icon={<SortAscendingOutlined />}
        size={"middle"}
        onClick={setAscending}
        disabled={isSortAscending}
      />
      <Button
        type="secondary"
        shape="circle"
        icon={<SortDescendingOutlined />}
        size={"middle"}
        onClick={setDescending}
        disabled={!isSortAscending}
      />
    </div>
  );
}

export default SortFilter;
