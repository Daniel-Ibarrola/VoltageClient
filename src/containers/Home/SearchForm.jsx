import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import "./style.css";

const SearchForm = ({ searchTerm, onSearchInput}) => {
    return (
        <Form className="search-form">
            <Row>
                <Col>
                    <Form.Control
                        id="search"
                        type="text"
                        placeholder="Buscar una estación"
                        value={searchTerm}
                        autoFocus={true}
                        onChange={onSearchInput}
                    />
                </Col>
            </Row>
        </Form>
    )
};


export { SearchForm };
