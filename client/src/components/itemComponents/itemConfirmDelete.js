
import { Modal, Icon, Header, Button, } from "semantic-ui-react";
import { useState } from "react";

import { deleteByItemId } from "../../services/itemsApi";

function ItemConfirmDelete({item, onConfirm}) {

    const [open, setOpen] = useState(false)
    const [currentItem, setItem] = useState(item);
    const [errors, setErrors] = useState([]);

    const handleDelete = () => {
        deleteByItemId(item)
        .then(() => {
            onConfirm(currentItem.tripId)
            setOpen(false)
        })
        .catch(errors)
    }

    return(
    <Modal
        closeIcon
        open={open}
        trigger={<Icon link name='trash'/>}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
    >
        <Header icon='red trash' content={`Delete ${currentItem.itemName}`} />
        <Modal.Content>
            <p>Are you sure you would like to delete {currentItem.itemName}?</p>
            <p>(click the <Icon name="cancel"/> to cancel)</p>  
        </Modal.Content>
        <Modal.Actions>
            <Button color="red" onClick={handleDelete}>Delete</Button>
        </Modal.Actions>
    </Modal>
    )
}

export default ItemConfirmDelete;

