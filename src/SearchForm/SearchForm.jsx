import * as React from "react";

const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit}) => {
    return (
        <form onSubmit={onSearchSubmit}>
            <input
                id="search"
                type="text"
                value={searchTerm}
                autoFocus={true}
                onChange={onSearchInput}
            />
            <button type="submit">Buscar</button>
        </form>
    )
};


export { SearchForm };
