import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  baslık:{
    fontSize:windowWidth*0.08,
    color:"black",
    fontWeight:"600",
    marginLeft:windowWidth*0.35
  },
  baslık_konum:{
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
    paddingTop:windowWidth*0.01
  },
  kullanici:{
    width:windowWidth*0.15,
    height:windowWidth*0.15,
    borderRadius:windowWidth*0.5,
    backgroundColor:"gray",
    marginLeft:windowWidth*0.18,
    alignItems:"center",
    justifyContent:"center"
  },
  kullaniciadi:{
    fontSize:windowWidth*0.065,
    fontWeight:"600",
    color:"white"
  },
  market:{
    width:windowWidth*0.4,
    height: windowWidth*0.45,
    borderRadius:windowWidth*0.1,
    borderColor:"black",
    borderWidth:windowWidth*0.001,
    marginLeft:windowWidth*0.05
  },
  marketKonum:{
    flexDirection:"row",
  },
  ürünyazi:{
    alignItems:"center",
    marginTop:windowWidth*0.05
  },
  ürüntext:{
    fontSize:windowWidth*0.05,
    color:"black",
    fontWeight:"600"
  },
  title:{
    marginTop:windowWidth*0.05,
    marginBottom:windowWidth*0.02,
    fontSize:windowWidth*0.04,
    fontWeight:"600",
    color:"black"
  }
})