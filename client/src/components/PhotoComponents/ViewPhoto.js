import { Item, Image, Segment, Header } from 'semantic-ui-react';
import { useState } from "react";
import Photo from "./Photo";

function ViewPhoto({locations}) {


    return <>
        {locations.map(a => a.photoList.length > 0 ? <div><Header content={a.location.name} dividing="true" /> <Photo key={a.photoId} photos={a.photoList} /> </div> : null)}
    </>
}

export default ViewPhoto;