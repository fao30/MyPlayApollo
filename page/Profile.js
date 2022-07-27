import React, { useEffect, useState, useRef } from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  PanResponder,
  ScrollView,
} from "react-native";
import { ApolloProvider, gql, useQuery, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { setToken } from "../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [coordinate, setCoordinate] = useState(0);

  useEffect(() => {
    if (coordinate > 590) {
      dispatch(setToken(""));
      removeData();
      logout();
    }
  }, [coordinate]);

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: (e, gesture) => {
        setCoordinate(gesture.moveY);
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
        }).start();
      },
    })
  ).current;

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
    <View style={styles.container}>
      <Button style={styles.TextSetting}>Setting</Button>
      <Text style={styles.titleText}>Drag & Release to the box, to logout</Text>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <MaterialCommunityIcons name="arrow-down" color="black" size={100} />
      </Animated.View>
      <MaterialCommunityIcons
        style={styles.line}
        name="arrow-down-bold-box-outline"
        color="black"
        size={100}
      />
      <Text>LOGOUT BOX</Text>
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
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5,
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
    bottom: 10,
  },
  line: {
    paddingTop: 250,
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
