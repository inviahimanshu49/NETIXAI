// src/navigation/DrawerNavigator.tsx
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/Home";
import CustomerScreen from "../screens/Customer";
import { SafeAreaView } from "react-native-safe-area-context";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen
          name="List Customers"
          component={CustomerScreen}
          options={{
            drawerLabel: "List Customers",
            title: "Customers",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
