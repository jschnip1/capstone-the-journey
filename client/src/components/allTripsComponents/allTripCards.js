import { useState, useEffect } from "react";
import { Card, Icon, Rating } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { getProfileByTripId } from "../../services/profileApi";

function AllTripCards({ tripInfo }) {
  const [profile, setProfile] = useState({
    profileId: 0,
    profilePhoto: "",
    profileDescription: "",
    name: "",
    userId: 0,
  });

  useEffect(() => {
    if (profile.profileId === 0) {
      getProfileByTripId(tripInfo.tripId)
        .then(setProfile)
        .catch((error) => {
          toast.error(`${error}`);
        });
    }
  });

  // console.log(tripInfo.tripReview)
  return (
    <>
      <Card
        key={tripInfo.tripId}
        as={Link}
        to={`/trip/overview/${tripInfo.tripId}`}
      >
        <Card.Content header={tripInfo.name} />
        <Card.Content>
          <Rating
            icon="star"
            rating={tripInfo.tripReview}
            maxRating={5}
            disabled
          />
        </Card.Content>
        <Card.Content>Create by: {profile.name}</Card.Content>
        <Card.Content extra>
          <Icon name="map" />
          {tripInfo.totalDistance} miles
        </Card.Content>
      </Card>
    </>
  );
}

export default AllTripCards;
