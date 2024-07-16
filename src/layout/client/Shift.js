import React, { useState, useEffect, useRef } from 'react';
import { Modal, TextInput, View, Image, Animated, StyleSheet, ScrollView, StatusBar, Easing, TouchableOpacity } from 'react-native';
import { Text, PaperProvider, DataTable, useTheme } from 'react-native-paper';
import images from '../../assets/images';
import  { useNavigation, useRoute } from '@react-navigation/native';
import HButton from '../../components/Hbutton'
import MFooter from '../../components/Mfooter';
import MHeader from '../../components/Mheader';
import SubNavbar from '../../components/SubNavbar';
import ImageButton from '../../components/ImageButton';
import { useAtom } from 'jotai';
import { firstNameAtom, emailAtom, userRoleAtom, entryDateAtom, phoneNumberAtom, addressAtom } from '../../context/AuthProvider';
// import MapView from 'react-native-maps';
import * as Progress from 'react-native-progress';

export default function Shift ({ navigation }) {
  //---------------------------------------Animation of Background---------------------------------------
  const [backgroundColor, setBackgroundColor] = useState('#0000ff'); // Initial color
  let colorIndex = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random color
      if(colorIndex >= 0.9) {
        colorIndex = 0;
      } else {
        colorIndex += 0.1;
      }

      const randomColor = colorIndex == 0 ? `#00000${Math.floor(colorIndex * 256).toString(16)}` : `#0000${Math.floor(colorIndex * 256).toString(16)}`;
      setBackgroundColor(randomColor);
      // console.log(randomColor)
    }, 500); // Change color every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const theme = useTheme();
  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [email, setEmail] = useAtom(emailAtom);
  const [userRole, setUserRole] = useAtom(userRoleAtom);
  const [entryDate, setEntryDate] = useAtom(entryDateAtom);
  const [phoneNumber, setPhoneNumber] = useAtom(phoneNumberAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const handleNavigate = (navigateUrl) => {
    navigation.navigate(navigateUrl);
  }

  // const userInfo = [
  //   {title: 'Entry Date', content: firstName},
  //   {title: 'Phone', content: phoneNumber},
  //   {title: 'email', content: userRole},
  //   {title: 'Caregiver', content: caregiver},
  // ]

  const userInfo = [[
    {title: 'JOB-ID', content: "344"},
    {title: 'Location', content: "Lancaster, NY"},
    {title: 'Pay Rate', content: "$30.00"},
    {title: 'SHIFT  STATUS', content: 'Pending - Completed Verification'},
    {title: 'Caregiver', content: 'Dale'},
    {title: 'Timesheet', content: 'animatedsticker.tgs'},
  ]]

  const handleEdit = () => {
    console.log('handleEdit')
  }
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState('');
  const handleItemPress = (e) => {
    setText(e);
    setShowModal(false);
  }

  return (
      <View style={styles.container}>
        <StatusBar 
            translucent backgroundColor="transparent"
        />
        <MHeader navigation={navigation} />
        <SubNavbar navigation={navigation} />
        <ScrollView style={{width: '100%', marginTop: 119}}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topView}>
            <Animated.View style={[styles.backTitle, {backgroundColor}]}>
              <Text style={styles.title}>AWARDED & COMPLETED SHIFTS</Text>
            </Animated.View>
            <View style={styles.bottomBar}/>
          </View>
          <Text style={styles.text}>All of your<Text style={{fontWeight: 'bold'}}>&nbsp;"AWARD"&nbsp;</Text> shifts will appear below. Once you have completed a shift, upload your timesheet and the shift status will update to <Text style={{fontWeight: 'bold'}}>&nbsp;"COMPLETE"&nbsp;</Text>.</Text>
          <View style={styles.imageButton}>
            <ImageButton title={"My Home"} onPress={() => handleNavigate('MyHome')} />
            <ImageButton title={"My Profile"} onPress={() => handleNavigate('MyProfile')} />
            <ImageButton title={"All Shift Listings"} onPress={() => handleNavigate('ShiftListing')} />
            <ImageButton title={"My Reporting"} onPress={() => handleNavigate('Reporting')} />
          </View>
          <View style={styles.profile}>
            <View style={styles.profileTitleBg}>
              <Text style={styles.profileTitle}>🖥️ MY SHIFTS</Text>
            </View>
            <Text style={styles.name}>100 per page</Text>
              {userInfo.map((it, idx) =>
                <View key={idx} style={styles.subBar}>
                  {it.map((item, index) => 
                    <View key={index} style={{flexDirection: 'row', width: '100%'}}>
                      <Text style={[styles.titles, item.title=="JOB-ID" ? {backgroundColor: "0x00ffff"} : {}]}>{item.title}</Text>
                      <Text style={[
                        styles.content, 
                        item.title == "JOB-ID" || item.title == "Status" ? {fontWeight: 'bold'} : {}
                      ]}>{item.content}</Text>
                    </View>
                  )}
                  <TouchableOpacity style={[styles.edit, {marginTop: 15, backgroundColor: '#3d94f6', marginLeft: '20%'}]} onPress = {() => handleEdit()}>
                    <Text style={{color: 'white'}}> Upload Timesheet</Text>
                  </TouchableOpacity>
                  <View style={{backgroundColor: "#C0D1DD", width: '100%', height: 5}}/>
                  <TouchableOpacity style={[styles.edit, {marginTop: 15, backgroundColor: '#3d94f6', width: '45%'}]} onPress = {() => handleEdit()}>
                    <Text style={{color: 'white'}}> CLOCK IN / OUT</Text>
                  </TouchableOpacity>
                    <View style={{flexDirection: 'row', width: '100%', gap: 20}}>
                      <Text style={[styles.titles, {width: '50'}]}>Hours Submitted?</Text>
                      <Text style={styles.content}>no</Text>
                    </View>
                    <View style={{flexDirection: 'row', width: '100%', gap: 20, marginBottom: 20}}>
                      <Text style={[styles.titles, {width: '50'}]}>Hours Approved?</Text>
                      <Text style={styles.content}>no</Text>
                    </View>

                </View>)
              }
          </View>
        </ScrollView>
        <MFooter />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    width: '100%'
  },
  topView: {
    marginTop: 30,
    marginLeft: '10%',
    width: '80%',
    position: 'relative'
  },
  backTitle: {
    backgroundColor: 'black',
    width: '100%',
    height: '55',
    marginTop: 10,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
    color: 'black',
    top: 10
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
    backgroundColor: 'transparent',
    paddingVertical: 10
  },
  bottomBar: {
    marginTop: 30,
    height: 5,
    backgroundColor: '#4f70ee1c',
    width: '100%'
  },
  text: {
    fontSize: 14,
    color: 'black',
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 30,
    width: '90%',
    marginLeft: '5%'
  },
  imageButton: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  profile: {
    marginTop: 20,
    width: '84%',
    marginLeft: '7%',
    padding: 20,
    backgroundColor: '#c2c3c42e',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#b0b0b0',
    marginBottom: 100
    // elevation: 1,
    // // shadowColor: 'rgba(0, 0, 0, 0.4)',
    // // shadowOffset: { width: 1, height: 1 },
    // shadowRadius: 0,
  },
  titles: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 30,
    width: '40%'
  },
  content: {
    fontSize: 16,
    lineHeight: 30,
    width: '60%'
  },
  profileTitleBg: {
    backgroundColor: '#BC222F',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    marginLeft: '10%',
    marginBottom: 20
  },
  profileTitle: {
    fontWeight: 'bold',
    color: 'white',
  },
  name: {
    fontSize: 14,
    marginVertical: 10,
  },
  edit: {
    backgroundColor: '#22138e',
    padding: 5,
    borderRadius: 10,
    fontWeight: 'bold',
    color: 'white',
    width: '55%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  subBar: {
    width: '100%',
    backgroundColor: "#f0fbfe",
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#c6c5c5"

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    width: '60%',
    height: '30%',
    marginLeft: '20',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 20
  },
});
  