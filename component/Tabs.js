import React from "react";
import { View, Image, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import { getAllLocations } from "../api/api";
import { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Importing screens
import map from "../screens/map";
import Songs from "../screens/songs";
import Profile from "../screens/profile";
import Play from "../screens/play";

// Importing styles and icons
import {colors} from "../styles";
import icons from "../data/icon";

// Create a Stack navigator for the Sample Songs Screen and Play Music Screen
const SongsStack = createStackNavigator();

/**
 * Renders the tab icon.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.focused - If the tab is currently focused.
 * @param {number} props.icon - The icon for the tab.
 * @param {number} props.width - The width of the icon.
 * @param {number} props.height - The height of the icon.
 */
function TabIcon({ focused, icon, width, height }) {
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                height: 80,
                width: 50,
            }}
        >
            <Image
                source={icon}
                resizeMode="contain"
                style={{
                    width: width,
                    height: height,
                    opacity: focused ? 1 : 0.5  
                }}
            />
        </View>
    );
}

/**
 * Renders the gradient header.
 */
function GradientHeader() {
    return (
        <LinearGradient 
            colors={[colors.purpleColorLighter, colors.blueColorDarker]} 
            style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
        >
        </LinearGradient>
    );
}

const Tab = createBottomTabNavigator();

/**
 * Returns the tab options configuration.
 * 
 * @param {number} icon - The icon for the tab.
 * @param {number} width - The width of the icon.
 * @param {number} height - The height of the icon.
 * @param {boolean} [unclickable=false] - Whether the tab is unclickable.
 * @param {string} [label=null] - The label text for the tab.
 */
function tabOptions(icon, width, height, unclickable = false,  label = null) {
    return {
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icon} width={width} height={height} />,
        header: () => <GradientHeader/>,
        headerTitleAlign: "center",
        tabBarLabel: () => label ? <Text style={{ color: colors.whiteColor, fontSize: 12 }}>{label}</Text>: null,
        tabBarStyle: {
            height: 80,
        },
        tabBarBackground: () => (
            <LinearGradient 
                colors={[colors.purpleColorLighter, colors.blueColorDarker]} 
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            />
        ),
        tabBarButton: unclickable ? (props) => <View {...props} /> : undefined, // If unclickable is true, provide a dummy component
    };
}

/**
 * Renders the Songs Stack Navigator.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.name - The name of the user.
 * @param {number} props.profileImage - The user's profile image.
 * @param {number} props.nearbyLocationId - The ID of the nearby location.
 */
function SongsStackNavigator({ name, profileImage, nearbyLocationId }) {
    return (
        <SongsStack.Navigator screenOptions={{ headerShown: false }}>
            <SongsStack.Screen name="Songs" children={(props) => <Songs {...props} locationId={nearbyLocationId}/>} />
            <SongsStack.Screen name="Play" children={(props) => <Play {...props} name={name} profileImage={profileImage}/>} />
        </SongsStack.Navigator>
    );
}

/**
 * Renders the main tab navigator. 
 * It checks user proximity to determine nearby songs and configures the tab accordingly.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.setName - Function to set user's name.
 * @param {Function} props.setProfileImage - Function to set user's profile image.
 * @param {number} props.profileImage - The user's profile image.
 * @param {string} props.name - The name of the user.
 */
function Tabs({navigation, setName, setProfileImage, profileImage, name}) {
    const [isNearby, setIsNearby] = useState(false); // state to ctrack if the user is nearby a location
    const [nearbyLocationId, setNearbyLocationId] = useState(null); //  state to track the nearby location ID

    useEffect(() => {
        let intervalId;
    
        async function checkProximity() {
            // Request user location permission
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.warn('Location permission not granted');
               
                setIsNearby(false);
                setNearbyLocationId(null);
                return;
            }
    
            // Get user's current location
            const location = await Location.getCurrentPositionAsync({});
            const userCoords = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude 
            };
            // Get all locations from the api
            const locations = await getAllLocations();
    
            let foundNearby = false;
    
            for (let loc of locations) {
                const distance = getDistance(userCoords, {
                    latitude: parseFloat(loc.latitude),
                    longitude: parseFloat(loc.longitude)
                });
                // console.log("Hello");
                // Check if the user location is within 100 meters of the target location
                if (distance <= 100) {
                    setIsNearby(true);
                    setNearbyLocationId(loc.id);
                    foundNearby = true;
                    break;
                }
            }
    
            // If none of the locations are nearby
            if (!foundNearby) {
                setIsNearby(false);
                setNearbyLocationId(null);
            }
    
            
        }
    
        // Initially check the proximity
        checkProximity();
    
        // Setup a regular interval to check proximity to keep on tracking user location
        intervalId = setInterval(checkProximity, 2000); // checking every minute
    
        // Cleanup interval when component is unmounted
        return () => {
            clearInterval(intervalId);
        };
    }, []);
    
    return (
        <Tab.Navigator>
             {/* Map Tab */}
            <Tab.Screen
                name="Map"
                component={map}
                options={{
                    ...tabOptions(icons.map_light, 30, 30, false),
                    tabBarActiveBackgroundColor: colors.blackColorTranslucentLess,
                }}
            />
              {/* SongsStack Tab */}
            <Tab.Screen
                name="SongsStack"
                children={() => <SongsStackNavigator name={name} profileImage={profileImage} nearbyLocationId={nearbyLocationId} />}
                options={{
                    ...tabOptions(icons.logo_light, 100, 100, !isNearby, isNearby ? "There's Music Nearby" : null),
                    tabBarActiveBackgroundColor: colors.blackColorTranslucentLess,
                }}
            />
              {/* Profile Tab */}
            <Tab.Screen
                name="Profile"
                children={(props) => <Profile setName={setName} setProfileImage={setProfileImage} profileImage={profileImage} name={name} {...props} />}
                options={{
                    ...tabOptions(icons.profile_light, 30, 30, false),
                    tabBarActiveBackgroundColor: colors.blackColorTranslucentLess,
                }}
            />
        </Tab.Navigator>
    );
}

export default Tabs;