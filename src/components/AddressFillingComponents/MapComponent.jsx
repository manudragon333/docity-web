import axios from "axios";
import { connect } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { GOOGLE_MAP_API_KEY } from "../../endpoint";
// import {
//   GoogleMap,
//   useJsApiLoader,
//   StandaloneSearchBox,
// } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "100%",
// };

// function MapComponent(props) {
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "AIzaSyCI8vje6WWUp3HMBIa8hFODV7Zu6qIQo3E",
//     libraries: ["places"],
//   });

//   const [map, setMap] = React.useState(null);
//   const [center, setCenter] = React.useState({
//     lat: 17.38714,
//     lng: 78.491684,
//   });

//   const onLoad = React.useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds();
//     map.fitBounds(bounds);
//     setMap(map);
//   }, []);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   const showPosition = (position) => {
//     setCenter({
//       lat: position.coords.latitude,
//       lng: position.coords.longitude,
//     });
//   };

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   const onPlacesChanged = () => console.log(this.searchBox.getPlaces());

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={100}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       {props.searchBox ? (
//         <StandaloneSearchBox onPlacesChanged={onPlacesChanged}>
//           <input
//             type="text"
//             placeholder="Search"
//             style={{
//               boxSizing: `border-box`,
//               border: `1px solid transparent`,
//               width: `300px`,
//               height: `35px`,
//               padding: `0 12px`,
//               borderRadius: `3px`,
//               boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
//               fontSize: `14px`,
//               outline: `none`,
//               textOverflow: `ellipses`,
//               position: "absolute",
//               left: "150px",
//               top: "30px",
//               marginLeft: "-120px",
//             }}
//           />
//         </StandaloneSearchBox>
//       ) : (
//         <></>
//       )}
//     </GoogleMap>
//   ) : (
//     <></>
//   );
// }

// export default React.memo(MapComponent);

const MapComponent = (props) => {
  const [map1, setMap1] = useState(null);
  const [marker1, setMarker1] = useState(null);
  const [mapTypeId, setMapTypeId] = useState("roadmap");
  const map = useRef();
  const marker = useRef();

  const autoCompleteInput =
    props.passAutoCompleteInput !== undefined
      ? props.passAutoCompleteInput
      : "";

  useEffect(() => {
    if (window.google) {
      map.current = new window.google.maps.Map(
        document.getElementById("map" + props.type),
        {
          center: props.center
            ? props.center
            : { lat: 17.38714, lng: 78.491684 },
          zoom: 12,
          id: "map" + props.type,
          mapTypeId: mapTypeId,
        }
      );
      setMap1(map.current);

      const autocomplete = new window.google.maps.places.Autocomplete(
        autoCompleteInput.current,
        {
          types: ["geocode"],
        }
      );

      marker.current = new window.google.maps.Marker({
        map: map.current,
        anchorPoint: new window.google.maps.Point(0, -29),
      });

      setMarker1(marker.current);

      if (props.center) {
        map.current.setZoom(15);
        marker.current.setPosition(props.center);
        marker.current.setVisible(true);
      }

      map.current.addListener("click", (cords) => {
        if (props.disableClick) {
          return;
        }
        map.current.setCenter(cords.latLng);
        map.current.setZoom(17);

        marker.current.setPosition(cords.latLng);
        marker.current.setVisible(true);
        props.formikRef && props.formikRef()("latitude", cords.latLng.lat());
        props.formikRef && props.formikRef()("longitude", cords.latLng.lng());
        axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${cords.latLng.lat()},${cords.latLng.lng()}&key=${GOOGLE_MAP_API_KEY}`
          )
          .then((res) => {
            console.log("map res: ", res);
            if (res?.data && res?.status === 200) {
              props.formikRef &&
                props.formikRef()(
                  "address",
                  res?.data?.results?.[0]?.formatted_address
                );
              props.formikRef &&
                props.formikRef()(
                  "city",
                  res?.data?.results?.[0]?.address_components.find((item) =>
                    item.types?.includes("administrative_area_level_2")
                  )?.long_name
                );
              props.formikRef &&
                props.formikRef()(
                  "state",
                  res?.data?.results?.[0]?.address_components.find((item) =>
                    item.types?.includes("administrative_area_level_1")
                  )?.long_name
                );
              props.formikRef &&
                props.formikRef()(
                  "pincode",
                  res?.data?.results?.[0]?.address_components.find((item) =>
                    item.types?.includes("postal_code")
                  )?.long_name
                );
              // props?.formikRef?.setFieldValue(
              //   "address",
              //   res?.data?.results?.[0]?.formatted_address
              // );
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });

      autocomplete.addListener("place_changed", () => {
        marker.current.setVisible(false);
        const place = autocomplete.getPlace();
        let loc;

        if (place && place.geometry && place.geometry.location) {
          loc = place.geometry.location;
        }

        if (!place.geometry || !place.geometry.location) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          var geocoder = new window.google.maps.Geocoder();
          var address = place.name;

          geocoder.geocode(
            {
              address: address,
            },
            function (results, status) {
              if (status === window.google.maps.GeocoderStatus.OK) {
                loc = results[0].geometry.location;
                // If the place has a geometry, then present it on a map.
                map.current.setCenter(loc);
                map.current.setZoom(17);
                marker.current.setPosition(loc);
                marker.current.setVisible(true);
              } else {
                window.alert(
                  "No details available for input: '" + place.name + "'"
                );
                return;
              }
            }
          );
        }
        if (place && place.geometry && place.geometry.location) {
          // If the place has a geometry, then present it on a map.
          map.current.setCenter(loc);
          map.current.setZoom(17);
          marker.current.setPosition(loc);
          marker.current.setVisible(true);
        }
      });
    }
    // eslint-disable-next-line
  }, [window.google]);

  useEffect(() => {
    if (map1 && marker1) {
      map1.setCenter(props.cords);
      map1.setZoom(12);
      marker1.setPosition(props.cords);
      marker1.setVisible(true);
      props.formikRef && props.formikRef()("latitude", props.cords.lat);
      props.formikRef && props.formikRef()("longitude", props.cords.lng);
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${props.cords.lat},${props.cords.lng}&key=${GOOGLE_MAP_API_KEY}`
        )
        .then((res) => {
          console.log("map res: ", res);
          if (
            (res?.data && res?.status === 200 && !props?.property?.address) ||
            props.locateMe
          ) {
            props.setLocateMe && props.setLocateMe(false);
            props.formikRef &&
              props.formikRef()(
                "address",
                res?.data?.results?.[0]?.formatted_address
              );
            props.formikRef &&
              props.formikRef()(
                "city",
                res?.data?.results?.[0]?.address_components.find((item) =>
                  item.types?.includes("administrative_area_level_2")
                )?.long_name
              );
            props.formikRef &&
              props.formikRef()(
                "state",
                res?.data?.results?.[0]?.address_components.find((item) =>
                  item.types?.includes("administrative_area_level_1")
                )?.long_name
              );
            props.formikRef &&
              props.formikRef()(
                "pincode",
                res?.data?.results?.[0]?.address_components.find((item) =>
                  item.types?.includes("postal_code")
                )?.long_name
              );
            // props?.formikRef?.setFieldValue(
            //   "address",
            //   res?.data?.results?.[0]?.formatted_address
            // );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, [props.cords]);

  return (
    <>
      <div className="relative h-inherit">
        <div id={"map" + props.type} style={{ height: "inherit" }}></div>
        {props?.searchBox ? (
          <div>
            <button
              type="button"
              className="map-roadmap"
              onClick={() => {
                map.current.setMapTypeId("roadmap");
              }}
            >
              Map
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              type="button"
              className="map-satellite"
              onClick={() => {
                map.current.setMapTypeId("hybrid");
              }}
            >
              Hybrid
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      {props.showNote && (
        <div className="p1 map-instructions">
          <h4 className="text-dark-gray mb1">How to use?</h4>
          <div className="text-dark-gray mb1 text-justify">
            Details you must submit for verification are in the fields on the
            left side. If you know the address of your property, just enter it
            into the Address field. <br />
            <br />
            Alternatively, you can use the search feature in the map section to
            find the location. When a pin is placed on a location in the map,
            it’s address automatically appears in the Address field. You may
            edit this address before submitting.
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    property: state?.propertyContact?.property,
  };
};

export default connect(mapStateToProps)(MapComponent);
