import RBDropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Dropdown = () => {

    return (
        <DropdownButton id="dropdown-item-button" title="Intervalo">
            <RBDropdown.Item as="button">Última semana</RBDropdown.Item>
            <RBDropdown.Item as="button">Último mes</RBDropdown.Item>
            <RBDropdown.Item as="button">Último año</RBDropdown.Item>
        </DropdownButton>

    );
};

export { Dropdown };
