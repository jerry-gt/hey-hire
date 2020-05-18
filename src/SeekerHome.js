import React, {useState, useEffect} from 'react'
import {
  SafeAreaView, 
  View, 
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import {getUser} from './utils/utils.js';
import {postFormData} from './utils/network.js'
import { LinearGradient } from 'expo-linear-gradient';

function SeekerHome({navigation}){
  const [user, setUser] = useState({})
  const [profile, setProfile] = useState({})
  
  useEffect(() => {
    getUser().then(u => {
      let u2 = JSON.parse(u)
      // console.log(u2)
      setUser(u2)

      let form = new FormData();
      form.append('user_token', u2.user_token)
      form.append('user_id', u2.user_id)

      postFormData('user_profile', form)
      .then(res => {
        return res.json()
      })
      .then(json => {
        // console.log(json.data)
        setProfile(json.data)
      })
      .catch(err => {
        console.log(err)
      })
    })
  }, [])

  useEffect(()=>{
    
    // return () => setProfile({})
  }, [])
  
  
  return(
    <LinearGradient 
      style={{flex: 1, alignItems: 'center'}} 
      colors={['#4E35AE', '#775ED7']}>
    <ScrollView style={{flex: 1, }}>
      <SafeAreaView>
        <View style={{
          // backgroundColor: '#4E35AE',
          flex: 1, 
          flexDirection: 'row', 
          alignItems: 'center', 
          borderBottomWidth: 1, 
          borderBottomColor: '#715FCB', 
          paddingBottom: 10,
          paddingTop: 15
        }}>
          <View style={{width: '33.3%'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{paddingLeft: 10, color: '#fff', fontSize: 18}}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '33.3%'}}>
            <Image source={require('../assets/title_header.png')} style={{width: 120, height: 25}} />
          </View>
          <View style={{width: '33.3%'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{paddingRight: 10, textAlign: 'right', color: '#fff', fontSize: 18}}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 1, alignItems: 'center', padding: 20, }}>
          <Image source={{uri: user.avatar_image}} style={{width: 100, height: 100, borderRadius: 50}} />
        </View>

        <View style={{flex: 1, alignItems: 'center', }}>
          <Text style={{color: '#fff', fontSize: 22}}>{user.first_name} {user.last_name}</Text>
        </View>

        <View style={{flex: 1, alignItems: 'center', }}>
          <Text style={{color: '#fff'}}>{user.education}</Text>
        </View>

        <View style={{flex: 1, alignItems: 'center', paddingBottom: 40, borderBottomWidth: 1, 
          borderBottomColor: '#715FCB', }}>
          <Text style={{color: '#fff'}}>{user.city}, {user.state}, {user.country}</Text>
        </View>

        <View style={{flex: 1, alignItems: 'flex-start', borderBottomWidth: 1, 
          borderBottomColor: '#715FCB', }}>
          <Text style={{color: '#fff', fontSize: 18, paddingLeft: 15, paddingTop: 10}}>Bio</Text> 
          <Text style={{color: '#fff', padding: 30, }}>{user.bio}</Text>
        </View>

        <View style={{flex: 1, alignItems: 'flex-start', borderBottomWidth: 1, 
          borderBottomColor: '#715FCB', paddingBottom: 10}}>
          <Text style={{color: '#fff', fontSize: 18, paddingLeft: 15, paddingTop: 10, paddingBottom: 20}}>Past positions</Text> 
          {profile.position ? profile.position.map((position) => {
            return(
              <View style={{flex: 1, paddingLeft: 30, paddingTop: 5, paddingBottom: 5}} key={position.post_id}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: '#fff', fontSize: 14, paddingBottom: 3}}>{position.from_date} - </Text>
                  <Text style={{color: '#fff', fontSize: 14, paddingBottom: 3}}>{position.to_date}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', width: '80%', flexWrap: 'wrap'}}>
                  <Text style={{color: '#fff', fontSize: 14, paddingBottom: 3}}>{position.category} - </Text>
                  <Text style={{color: '#fff', fontSize: 14, paddingBottom: 3}}>{position.company_name} - </Text>
                  <Text style={{color: '#fff', fontSize: 14, paddingBottom: 3}}>{position.city_name}</Text>
                </View>
                <View style={{borderBottomColor: '#715FCB', borderBottomWidth: 1}}></View>
              </View>
            )
          }) : null}
        </View>

        <View style={{flex: 1, }}>
          <View style={{height: 400, width: '100%', backgroundColor: '#fff'}}>

          </View>
        </View>

      </SafeAreaView>

    </ScrollView>
    </LinearGradient>
  )
}

export default SeekerHome;
