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
    color:"black",
    marginLeft:windowWidth*0.03,
    alignItems:"center",
    justifyContent:"center",
  },
  allsee:{
    color: '#333333', // Yazı için sade bir gri
    fontSize: 14, 
    fontWeight: 'bold',
  },
  allseebutton:{
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF', // Beyaz arka plan
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, // Hafif gölge efekti
    shadowOpacity: 0.1,
    shadowRadius: 3, // Gölgeyi yay
    elevation: 2, // Android gölgesi
    marginRight:windowWidth*0.05
  },
  discountPanel: {
    backgroundColor: '#F9F9F9',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    marginBottom:80,
  },
  discountPanelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  discountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  discountImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  discountInfo: {
    marginLeft: 10,
  },
  discountName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  discountPrice: {
    fontSize: 12,
    color: 'green',
  },
  discountPercentage: {
    fontSize: 12,
    color: 'red',
  },
})