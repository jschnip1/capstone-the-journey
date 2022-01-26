import React from "react";
import { Button, Icon, List } from "semantic-ui-react";

function AddLocationButton({ handleAddLocation, style }) {
  return (
    <div>
      <div className="button-container-addLocationButton" style={style}>
        <Button
          className="addLocationButton"
          animated
          onClick={handleAddLocation}
          type="submit"
        >
          <Button.Content visible>Add Location</Button.Content>
          <Button.Content hidden>
            <Icon name="plus circle" />
          </Button.Content>
        </Button>
      </div>
    </div>
  );
}

export default AddLocationButton;
