import { useState } from "react";
import { Table } from "semantic-ui-react";
import { save } from "../../services/itemsApi";

function Item({item}) {

    const [checked, setChecked] = useState(item.packed)

    const handleChange = (evt) => {
        item.packed = !item.packed;
        setChecked(item.packed)
        save(item)
            .then(console.log)
            .catch(console.log)
        
    }

    return (
        <Table.Row>
            {console.log(item)}
            <Table.Cell>{item.itemName}</Table.Cell>
            <Table.Cell>{item.itemDescription}</Table.Cell>
            <Table.Cell>{item.itemQuantity}</Table.Cell>
            <Table.Cell><input type="checkbox" checked={checked} onChange={handleChange}/></Table.Cell>
        </Table.Row>
    )
}

export default Item;