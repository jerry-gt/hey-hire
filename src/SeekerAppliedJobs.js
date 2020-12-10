import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native'
import { LinearGradient } from "expo-linear-gradient";

import { postFormData } from './utils/network.js'
import { getUser } from './utils/utils.js';
import { useIsFocused } from "@react-navigation/native";
import {strings} from './translation/config';

function SeekerAppliedJobs({ navigation }) {
  const isFocused = useIsFocused();
  const [appliedJobs, setAppliedJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [likedJobs, setLikedJobs] = useState([])

  const [user, setUser] = useState({})
  const [search, setSearch] = useState('')

  function searchJobs(txt) {
    setSearch(txt)

    let text = txt.toLowerCase()
    if (text == '') {
      setFilteredJobs( [...appliedJobs,...likedJobs])
    } else {
      let jobs = [...appliedJobs,...likedJobs].filter(j => (j.position.toLowerCase()).includes(text))
      setFilteredJobs(jobs)
    }
  }

  useEffect(() => {
    // console.log(isFocused)
    if (isFocused) {
      loadData()
    }
  }, [isFocused]);

  function loadData() {
    getUser().then(u => {
      let u2 = JSON.parse(u)
      // console.log(u2)
      setUser(u2)

      let form = new FormData();
      form.append('user_token', u2.user_token)
      form.append('user_id', u2.user_id)

      postFormData('sw_job_list', form)
        .then(res => {
          return res.json()
        })
        .then(json => {
          // console.log('+++++++++++++++++++')
          console.log(json)
          // console.log([...json.data,...json.liked_jobs])
          // console.log('+++++++++++++++++++')
          if (json.msg == "No Job Available!") {
            setAppliedJobs([])
            setFilteredJobs([])
          } else {
            setAppliedJobs(json.applied_jobs)
            setFilteredJobs([...json.applied_jobs,...json.liked_jobs]);
            setLikedJobs(json.liked_jobs);
          }
        })
        .catch(err => {
          console.log(err)
        })
    })
  }

  function addWishlist(job) {
    let form = new FormData();
    form.append("user_token", user.user_token);
    form.append("user_id", user.user_id);
    form.append("job_id", job.id);

    let url = 'add_like';
    if (job.like == '1') {
      url = "remove_like"
    }
    console.log(job.like)

    postFormData(url, form)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        // console.log('-----------')
        console.log(json);
        if (json.status_code == 200) {
          let findJob = filteredJobs.map((item) => {
            if (item.id == job.id) {
              if (job.like == 0) {
                item.like = 1;
              } else {
                item.like = 0;

              }
            }
            return item;
          });
          setFilteredJobs((jobs) => [...findJob]);
        }
        // Alert.alert("", json.msg);
        // console.log('+++++++++++')
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const list = filteredJobs.map((item => {
    // console.log(item)
    const isLiked = likedJobs.filter((item1) => item.id == item1.id);
    console.log('isLiked', isLiked)
    return (
      <TouchableOpacity key={item.id} onPress={() => navigation.navigate('SeekerAppliedJobs0', {
        screen: 'SeekerJobDetail',
        params: { job: item }
      }
      )}>
        <View style={{
          backgroundColor: '#F4F5FA',
          borderColor: '#eee',
          padding: 15,
          marginBottom: 15,
          borderWidth: 1,
          borderRadius: 10,
          shadowColor: "#888",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal:10
        }}>
          <View style={{ width: '20%' }}>
            <Image
              source={{ uri: item.business.avatar_image }}
              style={{ width: 40, height: 40, backgroundColor: '#444', borderRadius: 40, borderWidth: 1, borderColor: '#888' }} />
          </View>
          <View style={{ width: '70%', backgroundColor: '#F4F5FA', }}>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>{item.position}</Text>



                {(item.aplied === '1' && (isLiked.length == 0) || item.like!=1) ?
                  <Image source={require('../assets/ic_applied.png')} style={{ width: 60, height: 15, marginLeft: 15, }} />
                  : null}
              </View>

              <Text style={{ fontSize: 14, color: '#555' }}>{item.business.business_name}</Text>
              <Text style={{ fontSize: 12, color: '#888' }}>{item.business.address}</Text>
            </View>
          </View>
          <View>
            {isLiked.length > 0 && item.like==1?
              <TouchableOpacity
                onPress={() => addWishlist(item)}
               
              >
                <View style={{ width: 40 }}>
                  {item.like == '1' ? (
                    <Image
                      source={require("../assets/ic_heart_purple_header.png")}
                      style={{ width: 30, height: 30 }}
                      resizeMode={"stretch"}
                    />
                  ) : (
                      <Image
                        source={require("../assets/ic_heart_gray_header.png")}
                        style={{ width: 30, height: 30 }}
                        resizeMode={"stretch"}
                      />
                    )}
                </View>
              </TouchableOpacity> : null
            }
          </View>

        </View>
      </TouchableOpacity>
    )
  }))

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#4E35AE", "#775ED7"]}
    >
      <SafeAreaView>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#6652C2',
          paddingBottom: 10,
          backgroundColor: '#4E35AE',
          paddingTop: 20
        }}>
         
          <View style={{flex:1, alignItems:'center',justifyContent:'center' }}>
          <Image
                source={require("../assets/title_header.png")}
                style={{ width: 120, height: 25 }}
              />
          </View>
        </View>

        <ScrollView style={{ backgroundColor: '#4E35AE', marginBottom: 50 }}>



          <View style={{ backgroundColor: '#F4F5FA', minHeight: 1000 }}>
            <View style={{ backgroundColor: '#4E35AE', padding: 20, borderBottomLeftRadius: 7, borderBottomRightRadius: 7 }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image source={require('../assets/ic_search_w.png')} style={{ alignSelf: 'flex-start' }} />

                <TextInput
                  style={{ width: '85%', paddingLeft: 10, color: '#fff' }}
                  onChangeText={text => searchJobs(text)}
                  placeholder={strings.SEARCH}
                  value={search} />

                <Image source={require('../assets/ic_filter_w.png')} style={{}} />
              </View>
            </View>

            {list}
          </View>
        </ScrollView>
      </SafeAreaView>

    </LinearGradient>
  )
}

export default SeekerAppliedJobs;