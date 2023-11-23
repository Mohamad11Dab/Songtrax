
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import {styles, colors} from '../styles';
import { getSongById, getSongsByLocationID, getLocationByID, getRatingBySongID, createRating } from '../api/api';
import { Appearance} from 'react-native';
import { Rating } from 'react-native-ratings';

import icons from "../data/icon";

const mode = Appearance.getColorScheme();

/**
 * Songs component: Displays a list of songs for a given location, including ratings and song details.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - React Navigation object.
 * @param {Object} props.route - React Navigation route object.
 * @param {number} props.locationId - ID of the location for which songs are to be displayed.
 * 
 * @returns {JSX.Element} Rendered component.
 */
function Songs({ navigation, route, locationId }) {
  const [songs, setSongs] = useState([]); // State to track all the songs associted with the nearby location
  const [ratings, setRatings] = useState({}); // Object to map song IDs to their ratings
  const [locationName, setLocationName] = useState(''); // state for location name

  useEffect(() => {
    async function fetchSongs() {
        // Ensure there's a location ID provided
        if (locationId) {
            // Fetch songs by location ID
            const songsData = await getSongsByLocationID(locationId);

            // Fetch detailed information for each song
            const songDetailsPromises = songsData.map(song => getSongById(song.sample_id));
            const detailedSongs = await Promise.all(songDetailsPromises);
            setSongs(detailedSongs);

            // Fetch location name by ID
            const locationData = await getLocationByID(locationId);
            setLocationName(locationData.name);

            // Fetch ratings for each song and compute average rating
            const ratingPromises = detailedSongs.map(async song => {
                const ratingsData = await getRatingBySongID(song.id);
                if (ratingsData.length === 0) {
                    return 0.0; // Default rating if none found
                }
                // Calculate average rating
                const avgRating = ratingsData.reduce((acc, ratingObj) => acc + Number(ratingObj.rating), 0) / ratingsData.length;
                return avgRating;
            });
            const songRatings = await Promise.all(ratingPromises);
            
            // Create an object to store ratings by song id
            const ratingsObj = detailedSongs.reduce((acc, song, index) => {
                acc[song.id] = songRatings[index];
                return acc;
            }, {});
            setRatings(ratingsObj);
          }
       }
       fetchSongs();
     }, [locationId]);

 // Component to render separator between items in the list
  function ItemSeparator() {
    return (
      <View style={{ marginBottom:5, height: 2, width: "100%", backgroundColor: colors[mode].fgColorLighter }} />
    );
  }
  
  // Main component rendering
  return (
    <View style={styles.nearbyAndPlayContainer}>
      {/* Display location name and icon */}
      <View style={{...styles.location, marginBottom: 20 }}>
        <Image 
          source={mode == "dark" ? icons.pin_light : icons.pin_dark}
          resizeMode="contain"
          style = {{
            width: 50,
            height: 50
          }}
        />
        <Text style={styles.locationHeading}>{locationName}</Text>
      </View>
       {/* List of songs */}
      <FlatList
        data={songs}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
           // Each song item is clickable and navigates to 'Play' screen
          <TouchableOpacity onPress={() => navigation.push('Play', { song_ID: item.id, locationName: locationName })}>
              <View>
                  <Text style={styles.songName}>{item.name}</Text>
                  <Text style={styles.subHeading}>{new Date(item.datetime).toLocaleDateString()}</Text>
                  {/* Display star rating for each song */}
                  <Rating
                      type='star'
                      ratingCount={5}
                      imageSize={25}
                      readonly
                      tintColor ={mode == "light" ? null : colors[mode].bgColor}
                      style={{
                          marginTop: -15,
                          marginBottom: 5
                      }}
                      startingValue={ratings[item.id]}
                  />
              </View>
          </TouchableOpacity>
      )}
         // Use ItemSeparator function to separate song items
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={ItemSeparator} // Add this line to render an additional separator at the end
      />
    </View>
);


}

export default Songs;
