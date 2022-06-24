import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";

import "../css/header.css";

export default function Header({
  tags,
  selectedTags,
  handleSearch,
  handleSelect,
}) {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="header">
      <div className="container">
        <form
          onSubmit={(e) => {
            handleSearch(searchText);
            e.preventDefault();
          }}
          className="row g-3"
        >
          <div className="col-auto">
            <label className="logo">Projects</label>
          </div>

          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
          </div>
          <div className="col-auto">
            <Multiselect
              displayValue="key"
              hideSelectedList
              isObject={false}
              onKeyPressFn={function noRefCheck() {}}
              onRemove={(val) => handleSelect(val)}
              onSearch={function noRefCheck() {}}
              onSelect={(val) => handleSelect(val)}
              options={tags ? Array.from(tags) : []}
              placeholder={
                selectedTags.length > 0
                  ? `${selectedTags.length} Selected`
                  : "Choose Tag"
              }
              showCheckbox
            />
          </div>
          <div className="col-auto">
            <input
              type="submit"
              className="btn btn-primary mb-3"
              value="Search"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
