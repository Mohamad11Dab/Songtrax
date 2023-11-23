import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./component/Tabs";

// Initialize the Stack navigator
const Stack = createStackNavigator();

/**
 * Main App component
 *
 * @returns {React.Component} The rendered component
 */
function App() {
    // State to store the user's profile image and name
    const [profileImage, setProfileImage] = useState({});
    const [name, setName] = useState("");


    return (
     <>  
            <NavigationContainer>
                <Stack.Navigator
                // Default options for screens in the navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    // Set the initial screen to "Tabs"
                    initialRouteName={"Tabs"}
                >
                     {/* Define the "Tabs" screen in the stack */}
                    <Stack.Screen
                        name="Tabs"
                        // Provide props to the Tabs component, including setters and values for profile image and name
                        children={props => <Tabs {...props} setName={setName} setProfileImage={setProfileImage} profileImage={profileImage} name={name}/>}
                    />
               
                </Stack.Navigator>
            </NavigationContainer>
        </>
        
    );
}

export default App;