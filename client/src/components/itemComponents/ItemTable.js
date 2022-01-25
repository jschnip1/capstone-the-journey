import React, { useEffect, useState } from 'react'
import { Button, Table } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'

// import { fetchByTripId } from '../../services/itemsApi'
import Item from './Item'
import ErrorSummary from '../../ErrorSummary'
import ItemModal from './ItemModal'

function ItemTable({ items }) {

    const [itemList, setItemList] = useState(items)

    return (
        <div>
            <ItemModal/>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Decription</Table.HeaderCell>
                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                        <Table.HeaderCell>Packed?</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {itemList.map(item => <Item key={item.itemId} item={item} />)}
                </Table.Body>
                <ErrorSummary />
            </Table>
        </div>
    )
}

export default ItemTable;