import { Item } from 'semantic-ui-react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Photo from "./Photo";
import { fetchByLocationId } from "../services/PhotoApi";

function ViewPhoto() {
    return <>
        <Item.Group divided>
            <Photo />
        </Item.Group>
    </>
}

export default ViewPhoto;