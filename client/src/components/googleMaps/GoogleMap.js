import React, { useState, useEffect, useContext } from "react";
import { VariablesContext } from "../../context/VariablesContext";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 52.520008,
  lng: 13.404954,
};
const options = {
  styles: [
    {
      featureType: "administrative.country",
      elementType: "geometry",
      stylers: [
        {
          visibility: "simplified",
        },
        {
          hue: "#ff0000",
        },
      ],
    },
  ],
  // disabledDefaultUI: true,
};
const buttonLocate = {
  position: "absolute",
  top: 600,
  zIndex : 10,

}
export default function Map() {
   const { markers, setMarkers } = useContext(VariablesContext);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });
  //const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  console.log("sel", markers);
  //To avoid rerender of the map
  const onMapClick = React.useCallback(
    (event) =>
      setMarkers([
        {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          time: new Date(),
        },
      ]),
    []
  );

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);
  if (loadError) return "Error loading Map";
  if (!isLoaded) return "Loading Maps";
  return (
    <div style={{ marginTop: 100 }}>
      <Search panTo={panTo} />
      <Locate panTo={panTo} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        /* onClick={(event) => {
                  setMarkers((current) => [
                    ...current,
                    {
                      lat: event.latLng.lat(),
                      lng: event.latLng.lng(),
                      time: new Date(),
                    },
                  ]);
                }} */
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2>Pet</h2>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );

  function Locate({ panTo }) {
    return (
      <button style={buttonLocate}
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
      >
       {/*  <img src="compass.svg" alt="compass - locate me " />  */}
        Find my location
      </button>
    );
  }
  function Search() {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestion,
    } = usePlacesAutoComplete({
      requestOptions: {
        location: {
          lat: () => 52.520008,
          lng: () => 13.404954,
        },
        radius: 200 * 1000, //km
      },
    });
    return (
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          //clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch (error) {
            console.log("error");
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          <ComboboxList />
          {status === "OK" &&
            data.map(({ place_id, description }) => {
              <ComboboxOption key={place_id} value={description} />;
            })}
        </ComboboxPopover>
      </Combobox>
    );
  }
}
