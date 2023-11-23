import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, Button, Appearance, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import {styles, colors} from '../styles';
import { getSongById,createRating } from '../api/api';
import { Rating } from 'react-native-ratings';

import icons from "../data/icon";

// Obtain the device color scheme (light or dark mode)
const mode = Appearance.getColorScheme();

/**
 * Play component: A component to handle the playback and rating of a song.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.route - Navigation route.
 * @param {string} props.name - The user's name.
 * @param {Object} props.profileImage - The user's profile image.
 * 
 * @returns {JSX.Element} Rendered component.
 */
function Play({route, name, profileImage}) {
  const song_ID = route.params?.song_ID; // Extract song ID from navigation params
  const locationName = route.params?.locationName; // Extract location name from navigation params
  const [userRating, setUserRating] = useState(-1); // State to store user's song rating
  const [song, setSong] = useState(null); // State to store song details
  const webViewRef = useRef(); // Reference to the WebView component for playback control
  const [webViewState, setWebViewState] = useState({ 
      loaded: false,
      actioned: false,
  });

    // check if the user have provided an Image or not
    const hasPhoto = Boolean(profileImage.uri);

    // Fetch the song data using its ID
    useEffect(() => {
        async function fetchSong() {
            const result = await getSongById(song_ID);
            setSong(result);
        }

        fetchSong();
    }, []);

    // Save the user's rating of the song
    useEffect(() => {

      return async () => {
          if (userRating > 0) { // Only send if a rating has been given
              const newRating = {
                  sample_id: song.id,
                  rating: userRating
              };
              await createRating(newRating);
          }
      }
    }, [userRating]);
  
    // Handle playback control of the song (play/stop)
    function handleActionPress() {

        if(!webViewState.actioned) {
            const playYourSong = `preparePreview(${song.recording_data},'${song.type}'); playPreview();`
            webViewRef.current.injectJavaScript(playYourSong);     
        }
        else {
            webViewRef.current.injectJavaScript("stopSong()");   
        }
        setWebViewState({
            ...webViewState,
            actioned: !webViewState.actioned
        });
    }


    return (
        <SafeAreaView style={styles.nearbyAndPlayContainer}>
            <View style={{marginTop:10}}>
               {/* Display location details */}
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
                 {/* Display song details */}
                {song && (
                    <View>
                        <Text style={{...styles.songName, marginBottom: 20, marginLeft: 10}}>{song.name}</Text>
                        <View style={styles.playButton}>
                        <Button 
                            title={webViewState.actioned ? "Stop Song" : "Play Song"}
                            onPress={handleActionPress}
                            color={colors[mode].bgColor} // Adjust the color based on the color mode
                        />
                        </View>
                    </View>
                )}
                {/* Display Rating component */}
                <Rating  
                    type='star'
                    ratingCount={5}
                    imageSize={50}
                    readonly={false}
                    onFinishRating={(rating) => setUserRating(rating)} // Save the rating to the state
                    tintColor={mode == "light" ? null : colors[mode].bgColor}
                    style={{
                        marginTop: 15,
                        marginBottom: 5
                    }}
                    startingValue={0}
                />
                 {/* Display user's info and others */}
                <View style={styles.userSection}> 
                    <Text style={styles.userSectionHeader}>Currently At This Location:</Text>
                    {hasPhoto ? (
                        <Image 
                            source= {{ uri: profileImage.uri }}   
                            resizeMode="contain"
                            style={{ width: 80, height: 80, borderRadius: 50 }}
                        />
                    ) : (
                        <Image 
                            source= {mode == "dark" ? icons.smiley_light : icons.smiley_dark}   
                            resizeMode="contain"
                            style={{ width: 80, height: 80, borderRadius: 50 }}
                        />
                    )}
                    <Text style={styles.userName}>{name == "" ? "Enter your name" : name}</Text>
                    <Image 
                        source= {mode == "dark" ? icons.smiley_light : icons.smiley_dark}   
                        resizeMode="contain"
                        style={{
                            width: 80, 
                            height: 80, 
                            borderRadius: 50, 
                        }}
                    />
                    <Text style={styles.others}>And Others...</Text>
                </View>
            </View>
             {/* WebView to handle song playback */}
            <WebView
                ref={webViewRef}
                originWhitelist={["*"]}
                source={{
                    uri: "https://comp2140.uqcloud.net/static/samples/index.html"
                }}
                style={{ display: 'none' }}
            />
        </SafeAreaView>
    );
}

  export default Play;