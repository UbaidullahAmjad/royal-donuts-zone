import React, { useEffect, useState } from 'react'
import GoogleMapReact from "google-map-react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../env';

const Direction = () => {

    const params = useParams();
    const[foundStore, setFoundStore] = useState(null)
    const [currentLoc, setCurrentLoc] = useState({
        lat: null,
        lng: null
    })
    
    const getLocation = ()=>{
        navigator.geolocation.getCurrentPosition(
           position =>setCurrentLoc({ 
             lat: position.coords.latitude, 
             lng: position.coords.longitude

           }), 
           err => console.log(err)
         );
       }

       const getStore = async ()=>{
        const response = await axios.get(
            `${URL}/royal/Description_store/${params.id}`
          );
          const data = response.data.store;
          setFoundStore(data);
        }

    useEffect(()=>{
        getStore();
        getLocation()
    },[])

    const apiIsLoaded = (map, maps) => {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        const origin = { lat: currentLoc.lat, lng: currentLoc.lng};
        const destination = { lat: foundStore != null && parseFloat(foundStore.latitude), lng: foundStore != null && parseFloat(foundStore.longitude)};

        directionsService.route(
            {
              origin: origin,
              destination: destination,
              travelMode: window.google.maps.TravelMode.DRIVING
            },
            (result, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
              } else {
                console.error(`error fetching directions ${result}`);
              }
            }
          );
    }  

  return (
    <>
     <div style={{ height: "600px", width: "100%" }}>
          <GoogleMapReact
             bootstrapURLKeys={{ key: "AIzaSyCYfmupb01hv66OR_AqMNP11qTNO-zJ95k" }}
            defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
            defaultZoom={10}
            center={currentLoc}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
          />
        </div>
    </>
  )
}

export default Direction