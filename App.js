import React, { useEffect, useState,useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput, Button, Alert,Linking,ImageBackground} from 'react-native';
import  Navigation from './components/Navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/OnboardingScreen';
import Login from './screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';


const Stack = createNativeStackNavigator();

const loggedInStates={
  NOT_LOGGED_IN:'NOT_LOGGED_IN',
  LOGGED_IN:'LOGGED_IN',
  LOGGING_IN:'LOGGING_IN'
}

const App = () =>{
  const [isFirstLaunch, setFirstLaunch] = React.useState(true);
  const [loggedInState, setLoggedInState] = React.useState(loggedInStates.NOT_LOGGED_IN);
  const [sessionToken, setSessionToken] = React.useState("");
  const [onBoarded,setOnBoarded] = React.useState(false);
  const onBoardedRef = useRef(false);

  useEffect(()=>{

  

    const getSessionToken = async()=>{
      const getOnBoarded = await AsyncStorage.getItem('onBoarded');
      setOnBoarded(getOnBoarded=='true');
      onBoardedRef.current='true'==getOnBoarded;
      console.log("onBoarded:", getOnBoarded);
      const sessionToken =  await AsyncStorage.getItem('sessionToken');
        console.log('sessionToken',sessionToken);
        const validateResponse = await fetch('https://dev.stedi.me/validate/'+sessionToken,
        {
          method:'GET',
          headers:{
            'content-type':'application/text'
          }
        }    
        );    
    
        if(validateResponse.status==200){//we know it is a good non-expired token
          const userName = await validateResponse.text();
          await AsyncStorage.setItem('userName',userName);//save user name for later
          setLoggedInState(loggedInStates.LOGGED_IN);
        }
        console.log('app.js login:',loggedInState)
        let initialRouteName=onBoardedRef.current !=true ? 'Onboarding' : (loggedInState==loggedInStates.LOGGED_IN ? 'Navigation' : 'Login')
        console.log('initialRouteName: '+initialRouteName);
        console.log('onBoardedRef.current:'+onBoardedRef.current);
        // if(getOnBoarded != 'true'){
        //     navigation.replace('Onboarding')
        //   }else if (loggedInState==loggedInStates.LOGGED_IN){
        //       navigation.replace('Navigation')
        //   }else if(loggedInState==loggedInStates.NOT_LOGGED_IN){
        //       console.log('going to login screen:',loggedInState)
        //       // navigation.replace('Login')
        //   }      
       }
       getSessionToken();
  
  },[]); 


  const getInitialRoute = ()=>{
    let initialRoute = 'Login';

    if(loggedInState==loggedInStates.LOGGED_IN){
      initialRoute='Navigation';
    }

    if (onBoarded==false){
      initialRoute='Onboarding';
    }
    console.log('InitialRoute: '+initialRoute);

    return initialRoute;
  }

  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        {/* We only show the Onboarding component the first time they run the app*/}
        {onBoarded ? null : (<Stack.Screen name='Onboarding' children={()=><OnboardingScreen setFirstLaunch={setFirstLaunch} loggedInStates={loggedInStates} loggedInState={loggedInState}/>}/>)}
        {/* We  show the login component if they don't have a valid login token already stored in the app*/}        
        {loggedInState==loggedInStates.LOGGED_IN ? null : (<Stack.Screen name='Login' children={()=><Login loggedInStates={loggedInStates} loggedInState={loggedInState} setLoggedInState={setLoggedInState} setSessionToken={setSessionToken}/>}/>)}
        {/* If they have logged in, and seen the onboarding component, we show them the tabbed navigation component*/}  
        <Stack.Screen name='Navigation' children={()=><Navigation loggedInStates={loggedInStates} loggedInState={loggedInState} setLoggedInState={setLoggedInState} sessionToken={sessionToken}/>}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}


 export default App;







// const App = () =>{

//   const [phoneNumber,setPhoneNumber] = React.useState("");
//   const [oneTimePassword, setOneTimePassword] = React.useState("");
//   const [homeTodayScore, setHomeTodayScore] = React.useState(0);
//   const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);
//   const [isBiometricEnrolled, setIsBiometricEnrolled] = React.useState(false);

//   // Check if hardware supports biometrics
//   useEffect(() => {
//    (async () => {
//       const compatible = await LocalAuthentication.hasHardwareAsync();
//       console.log("Compatible:",compatible);
//       setIsBiometricSupported(compatible);

//       const enrolled = await LocalAuthentication.isEnrolledAsync();
//       console.log("Enrolled:",enrolled);
//       setIsBiometricEnrolled(enrolled);
//     })();
//   });

//   useEffect(()=>{//this is code that has to run before we show app screen
//    const getSessionToken = async()=>{
//     const sessionToken =  await AsyncStorage.getItem('sessionToken');
//     console.log('sessionToken',sessionToken);
//     const validateResponse = await fetch('https://dev.stedi.me/validate/'+sessionToken,
//     {
//       method:'GET',
//       headers:{
//         'content-type':'application/text'
//       }
//     }    
//     );    

//     if(validateResponse.status==200){//we know it is a good non-expired token
//       const userName = await validateResponse.text();
//       await AsyncStorage.setItem('userName',userName);//save user name for later
//       setLoggedInState(loggedInStates.LOGGED_IN);//if token's bad it will skip this
//     }
//    }
//    getSessionToken();
//   });


//    if (isFirstLaunch == true && loggedInState!=loggedInStates.LOGGED_IN){
// return(
//   <OnboardingScreen setFirstLaunch={setFirstLaunch}/>
 
// );
//   }else if(loggedInState==loggedInStates.LOGGED_IN){
//     return <Navigation setLoggedInState={setLoggedInState}/>
//   } else if(loggedInState==loggedInStates.NOT_LOGGED_IN){
//     return (
//       <View style={styles.allBody}>
//         <Text style={styles.title}>Welcome Back</Text>
//         <Text style={styles.paragraph}> {isBiometricSupported ? 'Your device is compatible with Biometrics' 
//     : 'Your device is not compatible with Biometrics'}
//         </Text>        
//         <Text style={styles.paragraph}> {isBiometricEnrolled ? 'You have saved a fingerprint or face' 
//     : 'You have not saved a fingerprint or face'}
//         </Text>           
//         <TextInput 
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//           style={styles.input}  
//           placeholderTextColor='#4251f5' 
//           placeholder='Cell Phone'>          
//         </TextInput>
//         <TouchableOpacity
//          style={styles.bioButton}
//           onPress={async () => {  
//             const biometricAuth = await LocalAuthentication.authenticateAsync({
//                   promptMessage: 'Login with Biometrics',
//                   disableDeviceFallback: true,
//                   cancelLabel:"cancel"
//                 });
//           }}
//         >
//         <Text style={{color:'white'}}>Biometric Authentication</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//            style={styles.sendButton}
//           onPress={async ()=>{
//             console.log(phoneNumber+' Button was pressed')

//             const sendTextResponse=await fetch(
//               'https://dev.stedi.me/twofactorlogin/'+phoneNumber,
//               {
//                 method:'POST',
//                 headers:{
//                  'content-type':'application/text'
//                }
//               }
//             )
//             const sendTextResponseData = await sendTextResponse.text();
//             if(sendTextResponse.status!=200){//invalid phone number, send them to the signup page
//               await Linking.openURL('https://dev.stedi.me/createcustomer.html');
//             } else{
//               setLoggedInState(loggedInStates.LOGGING_IN);
//             }
//           }}
//         >
//           <Text style={{color:'white'}}>Send</Text>      
//         </TouchableOpacity>
//         {/* </ImageBackground> */}
//       </View>
//     )
//   } else if(loggedInState==loggedInStates.LOGGING_IN){
//     return (
//       <View style={styles.allBody}>
//       <TextInput 
//         value={oneTimePassword}
//         onChangeText={setOneTimePassword}
//         style={styles.input}  
//         placeholderTextColor='#4251f5' 
//         placeholder='One Time Password'   
//         keyboardType='numeric'>
//       </TextInput>
//       <TouchableOpacity
//           style={styles.loginButton}
//           onPress={async ()=>{
//             console.log(phoneNumber+' Button was pressed')

//             const loginResponse=await fetch(
//               'https://dev.stedi.me/twofactorlogin',
//               {
//                 method:'POST',
//                 headers:{
//                  'content-type':'application/text'
//                 },
//                 body:JSON.stringify({
//                   phoneNumber,
//                   oneTimePassword
//                 }
//                 )
//               }
//             )
//             if(loginResponse.status==200){//200 means the password was valid

//               const sessionToken = await loginResponse.text();
//               console.log('sessionToken in Login Button',sessionToken);
//               await AsyncStorage.setItem('sessionToken',sessionToken);//local storage
//               setLoggedInState(loggedInStates.LOGGED_IN);
//             } else{
//               console.log('response status',loginResponse.status);
//               Alert.alert('Invalid','Invalid Login information')
//               setLoggedInState(NOT_LOGGED_IN);
//             }
//           }}
//           >
//           <Text style={{color:'white'}}>Login</Text>
//           </TouchableOpacity>
          

//       </View>
//     )
//   }
// }
//  export default App;

 
//  const styles = StyleSheet.create({
//      container:{
//          alignItems:'center',
//          justifyContent: 'center',
//      },
//      allBody:{
//      marginTop:150,
//      marginLeft:20,
//      marginRight:20
//      },
//      input: {
//        height: 40,
//        marginTop: 25,
//        borderWidth: 1,
//        padding: 10,
//        borderRadius: 100,
//        marginBottom:15
//      },
//      margin:{
//        marginTop:100
//      },
//      bioButton:{
//       alignItems: 'center',
//       backgroundColor: '#A0CE4E',
//       padding: 10,
//       marginTop: 5,
//       borderRadius:10
//      },
//      sendButton:{
//     alignItems: 'center',
//     backgroundColor: '#A0CE4E',
//     padding: 10,
//     marginTop: 8,
//     borderRadius:10
//      },
//      loginButton:{
//       alignItems: 'center',
//       backgroundColor: '#A0CE4E',
//       padding: 10,
//       marginTop: 8,
//       borderRadius:10
//      },
//      title:{
//       textAlign:"center",
//       color:'#A0CE4E',
//       fontSize:40, 
//       fontWeight:'bold',
//       marginBottom:35
//      },
//      image: {
//       flex: 1,
//       justifyContent: 'center',
//     },     
//     tinyLogo: {
//       width: 50,
//       height: 50,
//       marginTop:100,
//       justifyContent:'center'
//     },
//     paragraph:{
//       textAlign:'center'
//     }
  
//  })