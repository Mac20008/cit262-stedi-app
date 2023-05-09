
import React, { useEffect,useRef, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, SafeAreaView , Share, ScrollView, Button} from 'react-native';
import { Card, CardTitle, CardContent} from 'react-native-material-cards';
import { Avatar, Title, Caption } from 'react-native-paper';

import {Camera,CameraType} from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const Profile = (props) => {

  const [userName, setUserName] = useState("");
  const[profilePhoto,setProfilePhoto] = useState(null);
  const[cameraReady,setCameraReady]= useState(false);
  const cameraRef = useRef(null);
  // const [score, setScore] = useState(0);

  const navigation = useNavigation();

  useEffect(()=>{
    const getUserInfo= async()=>{
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      //setCameraPermission(cameraPermission);
      const userName = await AsyncStorage.getItem('userName');
      console.log('userName',userName);
      setUserName(userName);
      // await AsyncStorage.removeItem('profilePhoto');
      const profilePhoto = await AsyncStorage.getItem('profilePhoto');
      
      setProfilePhoto(profilePhoto);

    }
    getUserInfo();
  });

  const myCustomerShare = async() =>{
    const shareOptions = {
      message: 'This is a test'
    }
    try{
      const shareResponse = await Share.share(shareOptions)
      console.log(shareResponse);
      }
      catch(error){
  console.log('Error', error)
      }
    }
    if(profilePhoto==null){
      const cameraOptions={
        quality:0,
        exif:false
      }
      return (
        <View>
        <Camera type={CameraType.front} style={styles.camera} ref={cameraRef} onCameraReady={()=>{setCameraReady(true)}}>
          <View style={styles.buttonContainer}>
            {cameraReady?<TouchableOpacity style={styles.button} onPress={async ()=> {
              
              const picture = await cameraRef.current.takePictureAsync(cameraOptions);
              console.log('Picture',picture);
              await AsyncStorage.setItem('profilePhoto',picture.uri);
              setProfilePhoto(picture.uri);
              }}>
              <Text style={styles.text}>Take Picture</Text>
            </TouchableOpacity>: null}
          </View>
        </Camera>
      </View>
      )
    } else {
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
     <CardContent style={{marginTop:15}}>
      <View style={{flexDirection:'row', marginTop:15}}>
        <Avatar.Image
          source={{uri:profilePhoto}}
          size={80} 
       />
      <View style={{marginLeft:20}}>
        <Text style={[styles.title, {
         marginTop:15,
         marginBottom:5
        }]}>{userName}</Text>

      </View>
      </View>

      <Text style={{marginTop:25,marginBottom:10, color:'#A0CE4E', fontSize:17, fontWeight:'bold'}}>Your Index Score balance progress</Text>

      <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox,{
       marginBottom:10,
       marginTop:5
    }]}>
        <Title>20</Title>
        <Caption>Weekly index score</Caption>
        <Text>radom balance</Text>
        </View>
        </View>
        <View>
        <View style={styles.infoBoxWrapper2}>
        <Title>50</Title>
        <Caption>Monthly index score</Caption>
        <Text>radom balance</Text>
        </View>
        </View>
   
      

     <View style={{ marginTop:30 }}>
      <TouchableOpacity 
      style={styles.shareButton}
       onPress={myCustomerShare}>
      <Text style={{color:'white'}}>Share</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton}
       onPress={()=>{
        AsyncStorage.removeItem("sessionToken");
        AsyncStorage.removeItem("onBoarded");
        props.setLoggedInState('NOT_LOGGED_IN');
        navigation.replace('Login');
        }} >
          <Text style={{color:'white',}}>Logout</Text>
        </TouchableOpacity>    
    </View>
    </CardContent>
    </Card>
 </SafeAreaView>
  );
}
};
export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoBoxWrapper:{
borderBottomColor:'#dddddd',
borderBottomWidth:1,
borderTopColor:'#dddddd',
borderTopWidth:1,
marginTop:5,
height:100
  },
  infoBoxWrapper2:{
    borderBottomColor:'#dddddd',
    borderBottomWidth:1,
    marginTop:5,
    // flexDirection:'row',
    height:100
  },
  logoutButton:{
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    marginTop: 12,
    borderRadius:10
  },
  shareButton:{
    alignItems: 'center',
    backgroundColor: '#67a3d9',
    padding: 10,
    marginTop: 5,
    borderRadius:10
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
