import { Dimensions, Appearance} from 'react-native';
const { height } = Dimensions.get('window');
const mode = Appearance.getColorScheme();




// Light and Dark colour schemes
export const colors = {
	purpleColorLighter: "#A42DE8",
	blueColorLighter: "#318AFF",
	blueColorDarker: "#2D3DE8",
	blackColorTranslucentLess: "rgba(0,0,0,0.35)",
	blackColorTranslucentMore: "rgba(0,0,0,0.7)",
    whiteColor: "#ffffff",
    whiteColorTranslucent: "rgba(255,255,255, 0.5)",
	"light" : {
		bgColor: "#ffffff",
		fgColor: "#800080",
		fgColorLighter: "rgba(128,0,128,0.5)",
		headerTextColor: "#ffffff"
	},
	"dark" : {
		bgColor: "#422142",
		fgColor: "#f0c4f0",
		fgColorLighter: "rgba(210,169,210,0.5)",
		headerTextColor: "#f0c4f0",
	}
};



export const styles = {
    nearbyAndPlayContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: colors[mode].bgColor
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors[mode].fgColor,
        paddingBottom: 0
    },
    subHeading: {
        fontSize: 14,
        color: colors[mode].fgColor,
        paddingBottom: 25
    },
    songName: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors[mode].fgColor,
        paddingBottom: 0
    },
    location: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center", 
    },
    locationHeading: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors[mode].fgColor,
        paddingBottom: 6
    },
    playButton: {
        backgroundColor: colors[mode].fgColor,
        color: colors[mode].bgColor,
        fontWeight: "bold",
        padding: 10,
        borderRadius: 10,
        marginLeft: 20,
        textAlign: "center",
        width: "90%"
    },
    locationIcon: {
        width: 35,
        height: 105,
    },
    currentLocation: {
        marginBottom: 10
    }, 
    ratingComponent: {
        paddingTop: 15,
    },
    profileContainer: {
        padding: 20,
        backgroundColor: colors[mode].bgColor,
        flex: 1
    },
    input: {
       // marginTop: 20,
        backgroundColor: colors[mode].fgColorLighter,
        color: colors[mode].fgColor,
        borderRadius: 5,
        textAlign: "center",
        height: 40
    },
    photoEmptyView: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors[mode].fgColorLighter,
        borderStyle: "dashed",
        height: height / 1.7
    },
    photoFullImage: {
        width: "100%",
        borderRadius: 10,
        height: height / 2 + 30
    },
    addPhoto: {
        backgroundColor: colors[mode].fgColor,
        color: colors[mode].bgColor,
        fontWeight: "bold",
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
        width: "50%",
        marginLeft: "25%",
        marginTop: -(height / 3.25)
    },
    changePhoto: {
        backgroundColor: colors[mode].fgColor,
        color: colors[mode].bgColor,
        fontWeight: "bold",
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
        height: "10%",
        width: "50%",
        marginLeft: "25%",
        marginTop: -(height / 9)
    },
    userSection: { 
        marginLeft: 10,
        marginTop: 200
    },
    userSectionHeader: { 
        fontSize: 18,
        marginBottom: 30, 
        color: colors[mode].fgColor
    },
    userName: { 
        fontSize: 16, 
        marginLeft:120, 
        marginTop: -50, 
        marginBottom: 40, 
        color: colors[mode].fgColor 
    },
    others: { 
        fontSize: 16, 
        marginTop: 10, 
        color: colors[mode].fgColor, 
        marginLeft:120, 
        marginTop: -50 
    },
    container: {
        flex: 1,
    }
}


