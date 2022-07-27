import { ApolloProvider, gql, useQuery } from "@apollo/client";
import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Provider, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AsyncStorage } from "react-native";
import store from "./store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import { apolloClient } from "./apollo";
import Login from "./page/login";
import Student from "./page/student";
import Employee from "./page/employee";
import Home from "./page/Home";
import Profile from "./page/Profile";

// Imperial I-class Star Destroyer
const defaultStarshipId = "c3RhcnNoaXBzOjM=";

const GET_ROLE = gql`
  query Me {
    me
  }
`;

const AppWrap = ({ isStudent }) => {
  const { access_token } = useSelector((state) => state); //INI DIAAAA

  if (!access_token) {
    return (
      <NavigationContainer initialRouteName="Home">
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer initialRouteName="Home">
      <Tab.Navigator
        tabBarOptions={{
          style: {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: "#ffffff",
            borderRadius: 15,
            height: 90,
          },
        }}
      >
        <>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "Home",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          {isStudent ? (
            <>
              <Tab.Screen
                options={{
                  tabBarLabel: "Students",
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                      name="bag-personal"
                      color={color}
                      size={size}
                    />
                  ),
                }}
                name="Student"
                component={Student}
              />
            </>
          ) : (
            <>
              <Tab.Screen
                options={{
                  tabBarLabel: "Employee",
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                      name="ballot-outline"
                      color={color}
                      size={size}
                    />
                  ),
                }}
                name="Employee"
                component={Employee}
              />
            </>
          )}
          <Tab.Screen
            options={{
              tabBarLabel: "Profile",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={size}
                />
              ),
            }}
            name="Profile"
            component={Profile}
          />
        </>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

function RootComponent() {
  const [starshipId, setStarshipId] = useState(defaultStarshipId);
  const [isStudent, setIsStudent] = useState(true);
  const { access_token } = useSelector((state) => state); //INI DIAAAA
  const { data, error, loading } = useQuery(GET_ROLE, {
    variables: { id: starshipId },
  });

  useEffect(() => {
    // checkToken();
    if (data?.me?.groups.indexOf("student") > -1) {
      setIsStudent(true);
    } else {
      setIsStudent(false);
    }
  }, [access_token]);

  if (error) {
    console.log("Error fetching starship", error);
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color="#333" />
      ) : (
        <AppWrap isStudent={isStudent} />
      )}
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
    top: 0,
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
