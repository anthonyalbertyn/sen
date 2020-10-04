import React from "react";
import { Button } from "antd";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import "./SortFilter.css";

const propsDefinition = {
  isSortAscending: PropTypes.bool,
  setIsSortAscending: PropTypes.func.isRequired,
};

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

SortFilter.propTypes = propsDefinition;

export default SortFilter;
