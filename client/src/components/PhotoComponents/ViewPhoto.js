import { Item } from 'semantic-ui-react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Photo from "./Photo";
import { fetchByLocationId } from "../../services/PhotoApi";

function ViewPhoto({locations}) {

    // be careful as this just continually adds to photos without resetting it

    const [photos, setPhotoList] = useState([]);

    for (let i = 0; i < locations.length; i++) {
        if(locations[i].photoList.length > 0) {
            for (let j = 0; j < locations[i].photoList.length; j++) {
                photos.push(locations[i].photoList[j]);
            }
        }
    }

    return <>
        <Item.Group divided>
            {photos.map(a => <Photo key={a.photoId} photo={a} />)}
        </Item.Group>
    </>
}

export default ViewPhoto;