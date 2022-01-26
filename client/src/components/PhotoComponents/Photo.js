import { Item, Image  } from 'semantic-ui-react';
import { useState } from "react";

function Photo({photos}) {

    return <>
        {photos.length > 0 ? photos.map(a=> <div><Image size='medium' src={a.photo} float="left" verticalAlign="top" />
        <p>{a.caption}</p></div>) : null}
    </>
}

export default Photo;