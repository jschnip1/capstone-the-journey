import React, { useEffect, useState } from "react";
import { Button, Table } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { fetchByTripId } from "../../services/itemsApi";
import Item from "./Item";
import ErrorSummary from "../../ErrorSummary";
import ItemModal from "./ItemModal";
import { toast } from "react-toastify";

function ItemTable({ items, owner }) {
  const [itemList, setItemList] = useState(items);

  const removeFromList = (tripId) => {
    fetchByTripId(tripId)
      .then(setItemList)
      .catch((error) => {
        toast.error(`${error}`);
      });
  };

  const addToList = (item) => {
    const newItemList = [...itemList];
    newItemList.push(item);
    setItemList(newItemList);
  };

  return (
    <div>
      {owner ? <ItemModal onAdd={addToList} /> : <></>}
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Decription</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            {owner ? <Table.HeaderCell>Packed?</Table.HeaderCell> : <></>}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {itemList.map((item) => (
            <Item
              key={item.itemId}
              item={item}
              onDelete={removeFromList}
              owner={owner}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default ItemTable;
