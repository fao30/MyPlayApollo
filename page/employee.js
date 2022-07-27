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
import { useNavigation } from "@react-navigation/native";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../store/actions/index";
import { AsyncStorage } from "react-native";

const GET_EMPLOYEE = gql`
  query EmployeeInfo {
    employeesInfo
  }
`;

export default function Employee() {
  const navigation = useNavigation();
  const { data, error, loading } = useQuery(GET_EMPLOYEE);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setEmployeeDetails(data?.employeesInfo);
  }, [data]);

  const LOGOUT_SESSION = gql`
    mutation WipeMySession {
      wipeMySession
    }
  `;
  const [logout, { data: dataLogSession }] = useMutation(LOGOUT_SESSION);

  const removeData = async () => {
    await AsyncStorage.removeItem("token");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.text}>
          <Text style={styles.textHeader}>Employee Page</Text>
        </View>
        <Card style={styles.cardStyle}>
          <Card.Title title="ID" subtitle={employeeDetails?.id} />
          <Card.Title title="Full Name" subtitle={employeeDetails?.full_name} />
          <Card.Title title="First Name" subtitle={employeeDetails?.first} />
          <Card.Title title="Last Name" subtitle={employeeDetails?.last} />
        </Card>
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
  image: {
    marginBottom: 40,
  },
  text: {
    height: 70,
    width:400,
    marginTop:50,
    backgroundColor: "#5384ed",
    justifyContent: "center",
    marginLeft:10,
    shadowOpacity:0.5,
    shadowRadius:1,
    borderRadius: 200,
    alignItems: "center",
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 25,
    color:"white",
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
