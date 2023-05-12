import RBDropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Dropdown = ({ onItemClick }) => {

    return (
        <DropdownButton id="dropdown-item-button" title="Intervalo">
            <RBDropdown.Item as="button" onClick={() => onItemClick("week")}>
                Última semana
            </RBDropdown.Item>
            <RBDropdown.Item as="button" onClick={() => onItemClick("month")}>
                Último mes
            </RBDropdown.Item>
            <RBDropdown.Item as="button" onClick={() => onItemClick("year")}>
                Último año
            </RBDropdown.Item>
        </DropdownButton>
    );
};

export { Dropdown };
