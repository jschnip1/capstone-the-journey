import { Item } from 'semantic-ui-react';

function Photo({photo}) {

    console.log(photo);

    return <>
        <Item>
            <Item.Image size='medium' src={photo.photo} />
            <Item.Content verticalAlign='bottom'>{photo.caption}</Item.Content>
        </Item>
    </>
}

export default Photo;