import * as React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./style.css"

const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit}) => {
    // TODO: remove button
    return (
        <Form onSubmit={onSearchSubmit} className="search-form">
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
                <Col>
                    <Button variant="primary" type="submit" size="md">
                        Buscar
                    </Button>
                </Col>
            </Row>
        </Form>
    )
};


export { SearchForm };
