import React from 'react'
import { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'

import AuthContext from '../../AuthContext'
import ErrorSummary from '../../ErrorSummary'
import { save } from '../../services/itemsApi'

function ItemModal() {

    const { tripId } = useParams();
    const auth = useContext(AuthContext);

    const [errors, setErrors] = useState([]);
    const [open, setOpen] = useState(false)
    const [item, setItem] = useState({
        itemDescription: "",
        itemId: 0,
        itemName: "",
        itemQuantity: 1,
        packed: false,
        profileId: auth.profile.profileId,
        tripId: tripId
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("it is trying to submit")
        console.log(item)
        save(item)
            .then(() => setOpen(false))
            .catch(setErrors)
        
    }

    const handleChange = (evt) => {
        const nextItem = { ...item };
        nextItem[evt.target.name] = evt.target.value;
        setItem(nextItem);
    }

    return (
        <Modal
            closeIcon
            open={open}
            trigger={<Button>Add Item</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Header icon='briefcase' content='Add Item' />
            <Modal.Content>
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>Name *</label>
                        <input type="text" placeholder='Sunscreen' value={item.itemName} name="itemName" onChange={handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Decription (optional)</label>
                        <input type="text" placeholder='It is going to be hot' value={item.itemDescription} name="itemDescription" onChange={handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Quantity</label>
                        <input type="number" min={1} value={item.itemQuantity} name="itemQuantity" onChange={handleChange} />
                    </Form.Field>
                    <Button type="submit" color='green' >
                        <Icon name='checkmark' /> Save
                    </Button>
                </Form>
                <ErrorSummary errors={errors} />
            </Modal.Content>

        </Modal >
    )
}

export default ItemModal