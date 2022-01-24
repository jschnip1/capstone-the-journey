import React from "react";
import { MdAddLocation } from "react-icons/md";
import { Button, Icon } from "semantic-ui-react";

function AddLocationButton() {
  return (
    <>
      <Button animated compact size="mini">
        <Button.Content visible>Add Location</Button.Content>
        <Button.Content hidden>
          <Icon name="plus circle" />
        </Button.Content>
      </Button>
    </>
  );
}

export default AddLocationButton;
