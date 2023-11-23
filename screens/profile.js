
import { SafeAreaView, View, Image, Button, Text, TextInput, Appearance, KeyboardAvoidingView} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { styles, colors } from "../styles"; // Replace with the actual path to your stylesheet file

const mode = Appearance.getColorScheme();

/**
 * Profile component: Allows users to edit their profile details including name and profile picture.
 * 
 * @param {Object} props - Component props.
 * @param {Function} props.setName - Setter function for updating the user's name.
 * @param {Function} props.setProfileImage - Setter function for updating the user's profile image.
 * @param {Object} props.profileImage - The current profile image of the user.
 * @param {string} props.name - The current name of the user.
 * 
 * @returns {JSX.Element} Rendered component.
 */
export default function Profile({setName, setProfileImage, profileImage, name}) {

    /**
     * Open the image picker and allow the user to select an image for their profile.
     */
    const changeProfileImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // If the user didn't cancel and an image is selected, update the state
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setProfileImage(result.assets[0]);
        }
    };

    const hasPhoto = Boolean(profileImage.uri);

     /**
     * Render the user's profile photo (if available) or a placeholder view.
     */
    function Photo(props) {
      
      if (hasPhoto) {
          return (
              <View style={{ marginBottom: 20}}>
                  <Image
                      style={styles.photoFullImage}
                      resizeMode="cover"
                      source={{ uri: profileImage.uri }}
                  />
              </View>
          );
      } else {
          return <View style={styles.photoEmptyView} />;
      }
  }

  return (
    <KeyboardAvoidingView 
        behavior="position"
        style={styles.profileContainer}
    >
        <SafeAreaView >
            <View>
                <Text style={styles.heading}>Edit Profile</Text>
                <Text style={styles.subHeading}>Mirror, Mirror On The Wall...</Text>
                 {/*User's Image*/}
                <Photo />
                <View style={hasPhoto ? styles.changePhoto : styles.addPhoto}>
                   {/* The add/change button*/}
                    <Button
                        onPress={changeProfileImage}
                        title={hasPhoto ? "Change Photo" : "Add Photo"}
                        color={colors[mode].bgColor}    
                    />
                </View>
                <View style={{...styles.input, marginTop:hasPhoto ? 30 : 210}}>
                  {/*Text Input for displaying the user's name */}
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter Your Name"
                        placeholderTextColor={colors[mode].fgColorLighter}
                        style={{ color : colors.whiteColor, textAlign: 'center', marginTop: 10}}
                    />
                </View>
            </View>
        </SafeAreaView>
    </KeyboardAvoidingView>
);

}

