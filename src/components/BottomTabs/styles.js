import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    bottomtab:{
        width:windowWidth,
        height:windowWidth*0.15,
        backgroundColor:"white",
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"space-around",
        borderTopWidth:windowWidth*0.001
    },
    resim:{
        width:windowWidth*0.08,
        height: windowWidth*0.08,
    }
})