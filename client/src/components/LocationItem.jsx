import React, { useEffect } from "react";
import { Button, Icon, List } from "semantic-ui-react";
import LocationButton from "./LocationButton";

function LocationItem({ location, onDeleteLocation }) {
  function AddLocation() {}

  return (
    <>
      <List.Item>
        <Icon name="ellipsis vertical"></Icon>
        <List.Content>{location.text}</List.Content>
        <Icon
          name="trash inverted"
          link
          onClick={() => onDeleteLocation(location)}
        ></Icon>
      </List.Item>
    </>
  );
}

export default LocationItem;
