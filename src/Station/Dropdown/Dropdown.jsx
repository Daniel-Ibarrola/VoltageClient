import RBDropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./style.css"

const Dropdown = ({ onItemClick, type }) => {

    return (
        <DropdownButton
            className="dropdown-btn"
            id="dropdown-item-button"
            title="Intervalo"
        >
            <RBDropdown.Item as="button" onClick={() => onItemClick("week", type)}>
                Última semana
            </RBDropdown.Item>
            <RBDropdown.Item as="button" onClick={() => onItemClick("month", type)}>
                Último mes
            </RBDropdown.Item>
            <RBDropdown.Item as="button" onClick={() => onItemClick("year", type)}>
                Último año
            </RBDropdown.Item>
        </DropdownButton>
    );
};

export { Dropdown };
