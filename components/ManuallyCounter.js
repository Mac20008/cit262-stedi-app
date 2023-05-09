import React, {useState} from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";



const ManuanllyCounter = (props) =>{

const [newCouter, setNewCounter] = useState(0);

const addStepsManually = async() =>{
    setNewCounter(newCouter +1);
    props.tallyLatestSteps();
   }
   


   return( props.visible?(
    <TouchableOpacity style={styles.button} onPress={addStepsManually}>
    <Text style={styles.textButton}>Counter</Text>
  </TouchableOpacity>
   ): null
   );
};

const styles = StyleSheet.create({
    button:{
        backgroundColor: '#67a3d9',
        borderRadius:20,
        margin: 6, 
            
}, 
    textButton:{
       fontSize:15,
       margin:7,
       color:'#ffffff' 
}
});

export default ManuanllyCounter;