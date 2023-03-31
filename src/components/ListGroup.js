import React from "react";

const ListGroup = (props) => {
    const { items, textProperty, valueProperty, onItemSelect, selecteItem } = props
    return <ul className="list-group">
        {items.map(item =>
            <li key={item[valueProperty]}
                onClick={() => onItemSelect(item)}
                className={item === selecteItem ? "list-group-item active" : "list-group-item"}>
                {item[textProperty]}
            </li>)}

    </ul>
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}

export default ListGroup