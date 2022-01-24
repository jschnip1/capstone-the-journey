import { Item } from 'semantic-ui-react';

function Photo() {
    return <>
        <Item>
            <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
            <Item.Content verticalAlign='middle'>Content A</Item.Content>
        </Item>
    </>
}

export default Photo;