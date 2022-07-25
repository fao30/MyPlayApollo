import { ApolloProvider, gql, useQuery } from "@apollo/client";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Provider, useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const HomeStack = createNativeStackNavigator();
import store from "./store";

import { apolloClient } from "./apollo";
import Login from "./page/login";
import Student from "./page/student";
import Employee from "./page/employee";

// Imperial I-class Star Destroyer
const defaultStarshipId = "c3RhcnNoaXBzOjM=";

const LIST_STARSHIPTS = gql`
  query listStarships {
    allStarships {
      starships {
        id
        name
      }
    }
  }
`;

const GET_STARSHIP = gql`
  query EmployeeInfo {
    employeesInfo
  }
`;

const AppWrap = () => {
  // const [foundToken, setFoundToken] = useState("");
  const [tok, setTok] = useState("");
  const [isLoad, setIsLoad] = useState(true);
  const { access_token } = useSelector((state) => state); //INI DIAAAA

  useEffect(() => {
    // checkToken();
    console.log("JALAN GA?", access_token);
    // console.log("JALAN GA TOKEEENNN?", isLoad);
  }, [access_token]);

  return (
    <NavigationContainer initialRouteName="Home">
      <HomeStack.Navigator>
        {access_token ? (
          <>
            <HomeStack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
          </>
        ) : (
          <>
            <HomeStack.Screen
              options={{ headerShown: false }}
              name="Student"
              component={Student}
            />
            <HomeStack.Screen
              options={{ headerShown: false }}
              name="Employee"
              component={Employee}
            />
          </>
        )}
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

function RootComponent() {
  const [starshipId, setStarshipId] = useState(defaultStarshipId);
  const { data, error, loading } = useQuery(GET_STARSHIP, {
    variables: { id: starshipId },
  });

  useEffect(() => {
    // checkToken();
    console.log("===============================");
    console.log(data, "THISSSS<<<================");
    // data?.me?.groups.forEach(e => {
    //   console.log(e);
    // });
  }, [data]);

  if (error) {
    console.log("Error fetching starship", error);
  }

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator color="#333" /> : <AppWrap />}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  label: {
    marginBottom: 2,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  section: {
    marginVertical: 12,
  },
  starshipName: {
    fontSize: 32,
    fontWeight: "bold",
  },
  starshipModel: {
    fontStyle: "italic",
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <RootComponent />
      </ApolloProvider>
    </Provider>
  );
}
