import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import TodoList from "./src/containers/TodoList";
import UserAuthentication from "./src/containers/Auth";
import db, { initDatabase } from "./src/database/dbService";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthContext from "./src/contexts/AuthContext";

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    /** Initiating database once user is authenticated **/
    if (isAuthenticated) initDatabase(db);
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <NavigationContainer>
          <Stack.Navigator>
            {isAuthenticated ? (
              <Stack.Screen name="Todo List" component={TodoList} />
            ) : (
              <Stack.Screen name="Auth" component={UserAuthentication} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
      <StatusBar style="auto" />
      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
});
