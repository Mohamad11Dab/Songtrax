import React, { useState, useEffect } from "react";
import { StyleSheet, Appearance, View, Text, Image, Platform } from "react-native";
import MapView, { Circle, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from 'expo-location';
import { getAllLocations } from "../api/api";
import { dark_mode } from "../styling/styling";
import { styles } from "../styles";

// Get the device color scheme (light or dark mode)
const colorScheme = Appearance.getColorScheme();

/**
 * ShowMap component: Displays a map view that shows various locations and user's current position.
 */
export default function ShowMap() {
    // Initial state for map configurations
    const initialMapState = {
        locationPermission: false,
        locations: [],
        userLocation: {
            latitude: -27.5263381,
            longitude: 153.0954163, 
        }
    };
    const [mapState, setMapState] = useState(initialMapState);

    // Effect to request location permission
    useEffect(() => {
        async function requestLocationPermission() {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
              setMapState(prevState => ({ ...prevState, locationPermission: true }));
            }
        }
        requestLocationPermission();
    }, []);

    // Effect to monitor user's location if permission is granted
    useEffect(() => {
      async function monitorUserLocation() {
        if (mapState.locationPermission) {
            const subscription =  await Location.watchPositionAsync(
             {
                 accuracy: Location.Accuracy.High,
                 distanceInterval: 10 
             },
             location => {
                 const userLocation = {
                     latitude: location.coords.latitude,
                     longitude: location.coords.longitude
                 }
                 setMapState(prevState => ({ ...prevState, userLocation }));
             }
            
         );
         console.log("hey");
         // Cleanup function
         return () => {
         
          if (subscription) { 
              subscription.remove();
            }
          };
        } 
      }
      monitorUserLocation();
      
  }, [mapState.locationPermission]);

  // Effect to fetch all locations from API
    useEffect(() => {
        async function fetchLocations() {
            const fetchedLocationsData = await getAllLocations();
            const fetchedLocations = fetchedLocationsData.map(loc => ({
                id: loc.id,
                name: loc.name,
                coordinates: {
                    latitude: parseFloat(loc.latitude),
                    longitude: parseFloat(loc.longitude)
                }
            }));
            setMapState(prevState => ({ ...prevState, locations: fetchedLocations }));
        }
        fetchLocations();
    }, []);

    // Render the MapView component
    return (
        <MapView
            camera={{
                center: mapState.userLocation,
                pitch: 0, 
                heading: 0, 
                altitude: 3000, 
                zoom: 15 
            }}
            showsUserLocation={mapState.locationPermission}
            style={styles.container}
            provider={PROVIDER_GOOGLE}
            customMapStyle={colorScheme == "dark" ? dark_mode : [] }
        >
            {mapState.locations.map(location => (
                <Circle
                    key={location.id}
                    center={location.coordinates}
                    radius={100}
                    strokeWidth={3}
                    strokeColor="#A42DE8"
                    fillColor={colorScheme == "dark" ? "rgba(128,0,128,0.5)" : "rgba(210,169,210,0.5)"}
                />
            ))}
        </MapView>
    );
}
