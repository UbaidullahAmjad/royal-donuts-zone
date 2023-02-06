import React from "react";

import { Typeahead } from "react-bootstrap-typeahead";

export const TypeAheadToggleButton = ({ isOpen, onClick }) => (
  <button
    className="typehead_form_control_toggle_button"
    onClick={onClick}
    onMouseDown={(e) => {
      // Prevent input from losing focus.
      e.preventDefault();
    }}
  >
    {/* {isOpen ? '▲' : '▼'} */}
    <span className={isOpen ? "fa fa-angle-up" : "fa fa-angle-down"}></span>
  </button>
);

const TypeAhead = (props) => {
  return (
    <Typeahead
      className="typehead_form_control"
      id="multiple-typeahead"
      ref={props.Ref}
      key={props.Key}
      placeholder={props.Placeholder}
      labelKey={props.LabelKey}
      options={props.OptionList}
      selected={props.Selected}
      defaultSelected={props.DefaultSelected}
      onChange={props.ChangeOption}
      paginate={props.Paginate}
      onPaginate={props.OnPaginate}
      clearButton={props.ClearButton}
      multiple={props.MultipleOptions}
      disabled={props.Disabled}
    >
      {({ isMenuShown, toggleMenu }) => (
        <TypeAheadToggleButton
          isOpen={isMenuShown}
          onClick={(e) => toggleMenu()}
        />
      )}
    </Typeahead>
  );
};

export default TypeAhead;
