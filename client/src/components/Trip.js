import { Item, Icon } from 'semantic-ui-react';


function Trip({trip}) {
    return <>
        <Item>
            <Icon name="map pin" />
            <Item.Content verticalAlign='middle'>
                <Item.Header>{trip.locationId}</Item.Header>
            </Item.Content>
        </Item>
    </>
}

export default Trip;