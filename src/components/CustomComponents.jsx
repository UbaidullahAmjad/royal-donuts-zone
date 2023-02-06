
export const TypeAheadToggleButton = ({ isOpen, onClick }) => (
    <button
        className="typehead_form_control_toggle_button"
        onClick={onClick}
        onMouseDown={(e) => {
            // Prevent input from losing focus.
            e.preventDefault();
        }}>
        {/* {isOpen ? '▲' : '▼'} */}
        <span className={isOpen ? 'fa fa-angle-up' : 'fa fa-angle-down'}></span>
    </button>
);


