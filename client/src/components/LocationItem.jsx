import React, { useEffect } from "react";
import { Button, Icon, List } from "semantic-ui-react";

function LocationItem({ location }) {
  function AddLocation() {}

  return (
    <List.Item>
      <Icon name="ellipsis vertical"></Icon>
      <List.Content>{location.text}</List.Content>
    </List.Item>
  );
}

export default LocationItem;
