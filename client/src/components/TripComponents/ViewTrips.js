import { Item, Rating, RatingIcon } from 'semantic-ui-react';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Trip from "./Trip";
import { fetchById, save } from "../../services/TripApi";
import { authenticate } from '../../services/authApi';

const EMPTY_TRIP = {
    "tripId": 0,
    "startTime": 0,
    "endTime": 0,
    "tripReview": 0,
    "totalDistance": 0,
    "name": "",
    "disabled": false,
    "itemList": [],
    "commentList": [],
    "locations": []
}

function ViewTrips({ trip, owner }) {

    // const [trip, setTrip] = useState();
    const [rate, setRate] = useState(trip.tripReview)

    const handleRate = (evt, { rating }) => {
        setRate(rating)
        trip.tripReview = rating;
        save(trip)
            .catch(console.log)
    }

    return <>
    {console.log(trip)}
        <Item.Group>
            <h3>Start Date: {trip.startTime}    <span id="end-date-trip">End Date: {trip.endTime}</span></h3>
            {owner ? (
                
                <Rating icon='star' rating={trip.tripReview} maxRating={5} onRate={handleRate} />
            ) : (
                <Rating icon='star' rating={trip.tripReview} maxRating={5} onRate={handleRate} disabled/>
            )}
            {trip.locations.map(a => <Trip key={a.location.sortOrder} trip={a.location} />)}
        </Item.Group>
    </>
}

export default ViewTrips;