import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Share} from 'react-native';

const PopupModal = (props) => {

  const partnerLink = 'https://dev.stedi.me/timer.html#'+ props.shareToken;
  console.log(partnerLink)

  const [modalVisible, setModalVisible] = useState(true);

  const share = () =>{
    const options = {
      title: "STEDI Balance",
      message:"Help your friend!, " + partnerLink,
      url: partnerLink
    }
    Share.share(options)
  .then((res) => {console.log(res);
  })
  .catch((err) => {err && console.log(err);
  });
  }

const onPressHandler =() =>{
if(!modalVisible){
setModalVisible(false);
}else{
  setModalVisible(true);
}
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Would you like to send a link to a friend nearby who will count your steps for this 10 minute exercise?</Text>
            <View style={[styles.twoButtons]}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>No</Text>
            </Pressable>
            <Pressable  
              style={[styles.button, styles.buttonClose, styles.button2]}
              onPress={share}>
              <Text style={styles.textStyle}>Yes</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    
  },
  button: {
    borderRadius:5,
    padding: 10,
    // elevation: 2,
     margin:5
  },
  buttonOpen: {
    backgroundColor: '#67a3d9',
  },
  buttonClose: {
    backgroundColor:'#67a3d9',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button2:{
 margin:5,
  },
  twoButtons:{
    flexDirection: "row" ,
    marginLeft: 20,
    justifyContent: 'space-evenly',
  }
});

export default PopupModal;