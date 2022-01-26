import React from 'react';

function AddLocationButton() {
  return (
  <div>
      <div className="button-container-addLocationButton">
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
  </div>);
}

export default AddLocationButton;
