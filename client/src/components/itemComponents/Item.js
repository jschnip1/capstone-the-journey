import { useState } from "react";
import { Button, Icon, Tab, Table } from "semantic-ui-react";
import { save } from "../../services/itemsApi";
import ItemConfirmDelete from "./itemConfirmDelete";

function Item({ item, onDelete, owner }) {

    const [checked, setChecked] = useState(item.packed)

    const handleChange = (evt) => {
        item.packed = !item.packed;
        setChecked(item.packed)
        save(item)
            .catch(console.log)

    }

    return (
        <Table.Row>
            <Table.Cell>{item.itemName}</Table.Cell>
            <Table.Cell>{item.itemDescription}</Table.Cell>
            <Table.Cell>{item.itemQuantity}</Table.Cell>
            {owner ? (<>
                <Table.Cell><input type="checkbox" checked={checked} onChange={handleChange} /></Table.Cell>
                <Table.Cell><ItemConfirmDelete item={item} onConfirm={onDelete} /></Table.Cell>
            </>
            ) : (<></>)}

        </Table.Row>
    )
}

export default Item;