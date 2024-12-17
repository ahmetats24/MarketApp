import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  productCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    width:150
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    //backgroundColor:"red",
    width:100,
    height:60,
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    marginTop:10
  },
})