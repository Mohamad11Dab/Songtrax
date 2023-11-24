
# Welcome to Songtrax

Songtrax is an engaging, interactive app developed using React Native, a versatile JavaScript framework for building native applications. This app showcases seamless integration with both web and device-specific APIs, delivering a unified experience across various platforms.

## Powered by Expo

To ensure smooth operation and ease of testing, Songtrax is built on Expo. This platform enhances the app's cross-platform capabilities and simplifies the development process.

### Getting Started

To set up your environment for Songtrax, you'll need to install several packages. This can be done easily using the following command:

```bash
npx expo install @react-navigation/native react-native-screens react-native-safe-area-context @react-navigation/stack @react-navigation/bottom-tabs react-native-linear-gradient react-native-gesture-handler react-native-maps expo-location geolib react-native-webview react-native-image-picker
```

Once all the necessary packages are installed, you can start the app by running:

```bash
npx expo start
```

This command initiates the Expo server and prepares Songtrax for launch. Enjoy exploring the capabilities of Songtrax, built to leverage the best of cross-platform development!

### Map Page
- **Interactive Map**: Utilizes react-native-maps for navigation.
- **Mode Adaptation**: Automatically switches between light and dark modes based on device settings.
- **Location Markers**: Displays pre-defined locations as purple circles with a radius of about 100 meters.
- **User Location**: Showcases the user’s current location in blue, using the @react-native-community/geolocation module.
- **Customization**: Adjust your location manually for testing different scenarios.

  ![First Image Description](https://github.com/Mohamad11Dab/Songtrax-COMP2140/assets/114811082/7897d52f-b191-4133-aca6-a331a6263ac5) &nbsp; &nbsp; &nbsp; ![Second Image Description](https://github.com/Mohamad11Dab/Songtrax-COMP2140/assets/114811082/600d477f-fa94-48c9-bb39-d535fececa0f)


### Music Proximity Feature
- **Proximity Detection**: Calculates the distance between the user and predefined locations using the Geolib module.
- **Music at Location**: A full-page display activates when music is nearby, showing details about the location and available music samples.

    ![First Image Description](https://github.com/Mohamad11Dab/Songtrax-COMP2140/assets/114811082/678009fa-83cb-459e-abba-c4097fa25238) &nbsp; &nbsp; &nbsp; ![Second Image Description](https://github.com/Mohamad11Dab/Songtrax-COMP2140/assets/114811082/405a86ea-6096-4121-af99-1c22910c681c)

### Play Sample Page
- **Interactive Music Experience**: Listen to music samples with a simple Play/Stop interface.
- **Audio Playback**: Uses a webview and Tone.js sequencer for audio playback.
- **User Engagement**: Includes a rating component for users to rate music samples.

  ![First Image Description](https://github.com/Mohamad11Dab/Songtrax-COMP2140/assets/114811082/12503b9b-e4af-4845-93fd-528b81848002) &nbsp; &nbsp; &nbsp; ![Second Image Description](https://github.com/Mohamad11Dab/Songtrax-COMP2140/assets/114811082/2d87a070-726e-47c7-99bc-5c2538b44751)


### Profile Page
- **Personalization**: Allows users to edit and save their profile photo and name.
- **System Integration**: Uses the React Native Image Picker module for photo selection and system keyboard for name entry.

  ![First Image Description](https://github.com/Mohamad11Dab/Songtrax-COMP2140/assets/114811082/c65da3f1-8c3d-439e-ac42-a28c436b597f) &nbsp; &nbsp; &nbsp; ![Second Image Description](https://github.com/Mohamad11Dab/Songtrax-COMP2140/assets/114811082/7f0228ad-80b6-483c-9a2f-14db87568408)

Each page of Songtrax is designed to provide an intuitive and immersive experience, bridging the gap between music and location-based interaction.


