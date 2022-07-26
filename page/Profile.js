import React, { useEffect, useState, useRef } from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { ApolloProvider, gql, useQuery, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { setToken } from "../store/actions/index";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const removeData = async () => {
    await AsyncStorage.removeItem("token");
  };

  const LOGOUT_SESSION = gql`
    mutation WipeMySession {
      wipeMySession
    }
  `;

  const [logout, { data: dataLogSession }] = useMutation(LOGOUT_SESSION);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Button style={styles.TextSetting}>Setting</Button>
        <Button
          style={styles.TextHome}
          onPress={(e) => {
            e.preventDefault();
            dispatch(setToken(""));
            removeData();
            logout();
          }}
        >
          <Text style={styles.TextLogout}>Logout</Text>
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    fontWeight: "bold",
  },
  TextHome: {
    height: 100,
    marginTop: 0,
    marginLeft: 0,
  },
  TextSetting: {
    marginTop: 500,
  },
  TextLogout: {
    fontSize: 25,
    fontWeight: "bold",
  },
  image: {
    marginBottom: 40,
  },
  text: {
    height: 100,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 10,
  },
  cardStyle: {
    marginTop: 20,
    marginBottom: 20,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});
