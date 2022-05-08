import React, { useState, useContext, useEffect } from "react";

import Geocode from "react-geocode";

export default function ConvertedAddress(props) {
  let markers = props.markers;


  const [addressPet, setAddressPet] = useState("");

  useEffect(() => {
    if (markers !== undefined && markers.length > 0) {
      let lat = markers[0].lat;
      let lng = markers[0].lng;
   

      /*   const KEY = "process.env.REACT_APP_GOOGLE_API_KEY";*/
      Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

      // set response language. Defaults to english.
      Geocode.setLanguage("en");

      // set response region. Its optional.
      // A Geocoding request with region=es (Spain) will return the Spanish city.
      Geocode.setRegion("es");

      // set location_type filter . Its optional.
      // google geocoder returns more that one address for given lat/lng.
      // In some case we need one address as response for which google itself provides a location_type filter.
      // So we can easily parse the result for fetching address components
      // ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
      // And according to the below google docs in description, ROOFTOP param returns the most accurate result.
      Geocode.setLocationType("ROOFTOP");

      // Enable or disable logs. Its optional.
      Geocode.enableDebug();

      // Get address from latitude & longitude.
      Geocode.fromLatLng(lat, lng).then(
        (response) => {
          const address = response.results[0].formatted_address;
          
          setAddressPet(address);
          
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.log("no location selected");
    }
  }, []);
  return (
    <div>
      <span style={{ fontWeight: "bold" }}>Address: </span>
      {addressPet}
    </div>
  );
}
