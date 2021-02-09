import React, { Component } from "react";
import {
  View,
  Alert,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  BackHandler,
  Image,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {strings} from '../translation/config';

export default function ConfirmationAlert({ visible, job,onClose,onSendCV }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        onClose()
      }}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={[
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.4)",
            },
          ]}
        >
          <View
            style={{
              borderRadius: 5,
              width: "75%",
              marginHorizontal: "15%",
              alignItems: "center",
            }}
          >
            <View
              style={{
                borderRadius: 50,
                alignSelf: "center",
                position: "absolute",
                top: -40,
                zIndex: 999,
              }}
            >
              <Image
               source={{uri: job.business.avatar_image}}
                style={{ height: 70, width: 70, borderRadius: 50 }}
              />
            </View>
            <LinearGradient
              style={{ width: "100%", borderRadius: 10 }}
              colors={["#4E35AE", "#775ED7"]}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 50,
                  marginHorizontal:20
                }}
              >
                <Text style={[{ textAlign: "center", color: "rgba(255,255,255,0.7)" }]}>
                  {strings.YOU_ARE_ABOUT_TO} <Text style={{textDecorationLine:'underline',color:'#fff'}}>{job.position}</Text> {strings.POSTION_AT} <Text  style={{textDecorationLine:'underline',color:'#fff'}}>{job.business.business_name}</Text>
                </Text>
              </View>
              <View style={{ marginVertical: 20, alignItems: "center",marginTop:30 }}>
                <TouchableOpacity
                  style={[
                    {
                      width: "90%",
                      borderRadius: 30,
                      backgroundColor: "#fff",
                      borderWidth: 0.5,
                      paddingVertical: 10,
                      marginVertical: 5,
                    },
                  ]}
                  onPress={() => {
                    onSendCV();
                    onClose();
                  }}
                >
                  <Text
                    style={[
                      {
                        textAlign: "center",
                        color: "#4E35AE",
                        fontSize: 16,
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    {strings.SEND_CV}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    {
                      width: "90%",
                      borderRadius: 30,
                      borderColor: "#fff",
                      borderWidth: 0.5,
                      paddingVertical: 10,
                      marginTop: 10,
                    },
                  ]}
                  onPress={onClose}
                >
                  <Text
                    style={[
                      { textAlign: "center", color: "#fff", fontSize: 16 },
                    ]}
                  >
                    {strings.CANCEL}
                  </Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: "#e1e4e8",
  },
  top: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "#e1e4e8",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    color: "#000",
  },
  body: {
    fontSize: 14,
    color: "rgba(0,0,0,0.5)",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "#64969E",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    width: "100%",
    color: "#FFF",
  },
  btnTxt: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  btnSubscribe: {
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
  },
});
