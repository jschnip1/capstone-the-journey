import React from "react";
import { Button, Icon, List } from "semantic-ui-react";

function LocationButton({
  handleClick,
  style,
  actionText,
  iconName,
  classNameProp,
}) {
  return (
    <div className={classNameProp}>
      <div className="button-container-LocationButton" style={style}>
        <Button
          className="LocationButton"
          animated
          onClick={handleClick}
          type="submit"
        >
          <Button.Content visible>{actionText}</Button.Content>
          <Button.Content hidden>
            <Icon name={iconName} />
          </Button.Content>
        </Button>
      </div>
    </div>
  );
}

export default LocationButton;
