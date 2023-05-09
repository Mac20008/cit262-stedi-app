import React from 'react';
import { SafeAreaView, Text, StyleSheet, Linking } from 'react-native';
import { Card } from 'react-native-paper';


const About = (props) => {
    const url="https://www.stedibalance.com/";
    const youtubeUrl ="https://www.youtube.com/channel/UCDWI0nAwzZB8HB4569K0otg";
  return (
    <SafeAreaView style={styles.container}>
  <Card style={{backgroundColor:'white', borderRadius: 10, marginTop: 10, marginBottom:10 ,width: 340, shadowColor: "#000", 
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 4}}>

    <Text  style={styles.text} onPress={() => Linking.openURL(url)}>Learn about Stedi Balance</Text>

     <Text style={styles.text} onPress={() => Linking.openURL(youtubeUrl)}>Tutorials</Text>

     </Card>
 </SafeAreaView>
  )
}

export default About
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
  },
    text:{
     marginLeft:10,
     marginTop:10,
     marginRight:10,
     fontSize: 18,
      height: 45,
      color: '#0000EE',
      borderBottomColor:'#dddddd',
borderBottomWidth:1,
    },
  
  });