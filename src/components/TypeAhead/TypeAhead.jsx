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
      ref={props.ref}
      key={props.key}
      placeholder={props.placeholder}
      labelKey={props.labelKey}
      options={props.options}
      selected={props.selected}
      defaultSelected={props.defaultSelected}
      onChange={props.onChange}
      paginate={props.paginate}
      onPaginate={props.onPaginate}
      clearButton={props.clearButton}
      multiple={props.multiple}
      disabled={props.disabled}
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
