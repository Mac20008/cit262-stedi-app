import React, { useRef, useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Card, CardTitle, CardContent} from 'react-native-material-cards';


const Help = ({sessionToken}) =>{
const [subject, setSubject] = useState('disabled');
showOption = (option) =>{
if( showOption !== 'disabled'){
  setSubject(option);
}}
const [notification, setNotification] = useState (null);
const [name, setName] = useState(null);
const [toAddress, setToAddress] = useState(null);
const [messageText, setMessageText] = useState(null);

const submit = async(event) =>{
  try{
await fetch('https://dev.stedi.me/contact',{
  method:'POST',
  body:JSON.stringify({
name,
toAddress,
subject,
messageText
  }),
  headers:{
    "suresteps.session.token":sessionToken
  }
})
setNotification ("Thanks for submitting!");
setToAddress(null);
setName(null);
setMessageText(null);
setSubject(null);
} catch(error){
  console.log('error', error);
}
}
return(
<View style={styles.container}>
<Card style={{backgroundColor:'white', borderRadius: 10, marginTop: 10, marginBottom:10 ,width: 340, shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 4}}>
<Text style={styles.text}>Contact us</Text>
<TextInput 
 style={styles.input}
 placeholder="Name"
 value={name}
 onChangeText={(val)=> setName(val)}
 />

<TextInput
        style={styles.input}
        value={toAddress}
        onChangeText={(val)=> setToAddress(val)}
        placeholder="Email"
      />
      <View style={styles.dropdown} >
      {/* <Picker onValueChange={showOption}
      selectedValue={subject}
      >
      <Picker.Item style={styles.disabledaText} label= 'Please select a subject' value= 'disabled' color='#aaa'/>
        <Picker.Item label= 'The STEDI app is not working' value= 'APP_NOT_WORKING'/>
        <Picker.Item  label= 'I have an idea for improving STEDI' value= 'IDEA_IMPROVE_STEDI'/>
        <Picker.Item  label= 'I need help using the app' value= 'HELP_USING_APP'/>
        <Picker.Item  label= 'I need advice about my balance' value= 'ADVICE_ABOUT_BALANCE'/>
      </Picker> */}
      </View>
 <TextInput
        style={styles.input2}
        multiline
        numberOfLines={8}
        value={messageText}
        onChangeText={(val)=> setMessageText(val)}
        placeholder="Message"
      />
{/* <TouchableOpacity
title='Submit'
onPress={()}
style={styles.button} >
</TouchableOpacity> */}
 <Text>{notification}</Text>
<TouchableOpacity
  onPress={submit}
  style={styles.button}>
  <Text style={styles.text2}>Submit</Text>
</TouchableOpacity>
</Card>
  </View>
)}
export default Help;
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text:{
  marginLeft:15,
   marginRight:15,
   marginTop:15,
   fontSize: 18,
    height: 44,
  },
  input: {
    // height: 40,
    margin: 12,
    borderWidth: 1,
    width:315,
    padding:5,
    borderRadius: 5,
  },
  input2:{
    margin: 12,
    borderWidth: 1,
    padding:5,
    width:315,
    borderRadius: 5,
    marginTop:25,
    textAlignVertical: "top"
 
  },
  button: {
  padding:10,
  width:315,
  borderRadius: 5,
  backgroundColor: '#A0CE4E',
 tintColor: 'white',
  marginLeft: 10,
  marginRight: 10,
  marginTop: 10,

  },
  dropdown:{
  width: 315,
  height:42,
  marginLeft:12,
  marginTop:10,
  borderRadius:5,
  borderWidth:1,
  },
  text2:{
    color:'white',
    fontSize:15,
    textAlign:'center'
  },
  disabledaText:{
    fontSize:14,
  }
})