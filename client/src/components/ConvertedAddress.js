import React, { useState, useContext, useEffect } from "react";
import { VariablesContext } from "../context/VariablesContext";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Geocode from "react-geocode";


export default function ConvertedAddress(props) {
 // const { markers, setMarkers } = useContext(VariablesContext);
 let markers = props.markers;
  //const{addressPet, setAddressPet}= useContext(VariablesContext)
 const [addressPet, setAddressPet] =useState("")
    console.log("conv", markers)
  useEffect(() => {
    if (markers) {
      let lat = markers[0].lat
      let lng = markers[0].lng
      console.log(markers[0].lat)
      console.log(markers[0].lng)

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
         console.log("address",address);
         setAddressPet(address)
         console.log("petadd",address)
        },
        (error) => {
          console.error(error);
        }
      );  

      // Get formatted address, city, state, country from latitude & longitude when
      // Geocode.setLocationType("ROOFTOP") enabled
      // the below parser will work for most of the countries
 /*     Geocode.fromLatLng(lat, lng).then(
        (response) => {
          const address = response.results[0].formatted_address;
          let city, state, country;
          for (let i = 0; i < response.results[0].address_components.length; i++) {
            for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
              switch (response.results[0].address_components[i].types[j]) {
                case "locality":
                  city = response.results[0].address_components[i].long_name;
                  break;
                case "administrative_area_level_1":
                  state = response.results[0].address_components[i].long_name;
                  break;
                case "country":
                  country = response.results[0].address_components[i].long_name;
                  break;
              }
            }
          }
          console.log(city, state, country);
          console.log(address);
          setAddressPet(address)
          console.log("petaddre", addressPet)
        },
        (error) => {
          console.error(error);
        }
      ); 
 */
    // Get latitude & longitude from address.
   /*  Geocode.fromAddress("Eiffel Tower").then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    ); */} else {
      console.log("no location selected")
    }
  },[])
    return (<div>{addressPet} test</div>)
}