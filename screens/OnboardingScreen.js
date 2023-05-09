import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { SafeAreaView } from 'react-navigation';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dots = ({selected})=> {
let backgroundColor;

backgroundColor = selected ? '#A0CE4E': 'rgba(0, 0, 0, 0.3)';

return(
  <View
    style={{
  width:5,
  height:5,
  marginHorizontal: 3,
  borderRadius: 5,
  backgroundColor

    }}
  />
);
}

const Done = ({...props}) => {
  return(
  <TouchableOpacity style={{margin: 15}}
  {...props}
  >
  <Text>Done</Text></TouchableOpacity>
)}

const OnboardingScreen = ({setFirstLaunch, loggedInState, loggedInStates}) =>{
  const navigation = useNavigation();

    const changeOnboardingState = ()=>{
      AsyncStorage.setItem('onBoarded', 'true');
      setFirstLaunch(false) 
      navigation.replace(loggedInState==loggedInStates.LOGGED_IN?'Navigation':'Login');
     
    }

    return(
      // <SafeAreaView style={{ backgroundColor:'blue'}}>

        <Onboarding style={styles.container}
       DoneButtonComponent={Done}
      DotComponent={Dots}
        onSkip={changeOnboardingState}
        onDone={changeOnboardingState}
        pages={[
            {
              backgroundColor: '#fff',
              image: <Image   style={{height: '60%', width: '90%', resizeMode:'contain', marginBottom:-200}} source={require('../image/testing.png')} />,
              title: <Text style={{fontWeight:'bold', textAlign:'center', color:'#A0CE4E', fontSize:19, margin:12,  marginTop: -80}}>Welcome to STEDI  Balance</Text>,
              subtitle: 'Welcome to STEDI, we value your privacy. We will never sell your data or share it without permission. You will receive a text shortly to verify your phone number for your STEDI account.',
            },

              {
                backgroundColor: '#fff',
                image: <Image style={{height: '70%', width:'90%',  resizeMode:'contain', marginTop:-100}} source={require('../image/refer.png')} />,
                title: <Text style={{fontWeight:'bold', textAlign:'center', fontSize: 19, margin:15, color:'#A0CE4E', marginTop:-160}}>Share STEDI Balance with you friends</Text>,
                subtitle: 'Share and invite your family and friends to see your progress with STEDI',

              }
        ]}
        />
    );
};


export default OnboardingScreen;
const styles = StyleSheet.create({
    container:{
        flex:1, 
        alignItems:'center',
        justifyContent: 'center'
    }
})

