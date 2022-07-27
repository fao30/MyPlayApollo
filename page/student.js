import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import React, { useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  gql,
  useQuery,
  useMutation,
} from "@apollo/client";
import { setToken } from "../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { AsyncStorage } from "react-native";

const GET_STUDENT = gql`
  query StudentInfo {
    studentInfo
  }
`;

export default function Student() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { data, error, loading } = useQuery(GET_STUDENT);
  const [studentDetails, setStudents] = useState([]);
  useEffect(() => {
    setStudents(data?.studentInfo || []);
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
          <Text style={styles.textHeader}>Student Page</Text>
        </View>

        {studentDetails?.map((e, i) => (
          <Card key={i} style={styles.cardStyle}>
            <Card.Title title="Group" subtitle={e?.Group} />
            <Card.Title title="Basis" subtitle={e?.basis} />
            <Card.Title title="Dapartment Name" subtitle={e?.department_name} />
            <Card.Title title="Speciality Name" subtitle={e?.namespec} />
            <Card.Actions>
              <Button>Detail</Button>
            </Card.Actions>
          </Card>
        ))}
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
  image: {
    marginBottom: 40,
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
