import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, Text, TextInput, StyleSheet } from "react-native";
import BouncyCheckboxGroup from "react-native-bouncy-checkbox-group";
import {
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native-gesture-handler";

interface UserData {
  id: number;
  name: string;
  type: number;
}

interface StaticData {
  id: number;
  fillColor: string;
  unFillColor: string;
  text1: string;
  text: string;
  textStyle: {
    textDecorationLine: string;
    color: string;
    marginVertical: number;
  };
}

const CustomerScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [data, setData] = useState<UserData[]>([]);
  const [filterData, setFilterData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const isFocused = useIsFocused();

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://gist.github.com/AshishKapoor/5defdc8ff44665248b04bfbbbaa60307/raw"
      );
      const jsonData = await response.json();
      setData(jsonData?.users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
      if (staticData.length > 0) {
        handleCheckboxChange(staticData[0]);
      }
    }
  }, [isFocused]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleCheckboxChange = (selectedItem: StaticData) => {
    const filteredData = data.filter((item) => item.type === selectedItem.id);
    setFilterData(filteredData);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilterData(filteredData);
  };

  const isAdminPresent = filterData.some((item) => item.type === 0);

  const renderItem = ({ item }: { item: UserData }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.nameInitial}>{item?.name.charAt(0)}</Text>
      <View style={styles.itemContent}>
        <Text style={styles.name}>{item?.name}</Text>
        <Text style={styles.roleType}>
          {item?.type === 1 ? "Manager" : "Admin"}
        </Text>
      </View>
    </View>
  );

  const staticData: StaticData[] = [
    {
      id: 0,
      fillColor: "black",
      unFillColor: "#f6f6f6",
      text1: "Admin",
      text: "Admin",
      textStyle: {
        textDecorationLine: "none",
        color: "#000000",
        marginVertical: 10,
      },
    },
    {
      id: 1,
      fillColor: "black",
      unFillColor: "#f6f6f6",
      text1: "Manager",
      text: "Manager",
      textStyle: {
        textDecorationLine: "none",
        color: "#000000",
        marginVertical: 20,
      },
    },
  ];

  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name"
          onChangeText={handleSearch}
          value={searchQuery}
        />

        <Text style={styles.heading}>User Types</Text>

        <BouncyCheckboxGroup
          initial={0}
          data={staticData}
          style={{ flexDirection: "column", marginTop: 20 }}
          onChange={handleCheckboxChange}
        />

        <View style={styles.divider}></View>

        <View style={styles.userList}>
          <Text style={styles.heading2}>
            {isAdminPresent ? "Admin Users" : "Manager Users"}
          </Text>
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={{ marginVertical: 10 }}
            data={filterData}
            renderItem={renderItem}
          />
        </View>
        <View style={styles.divider}></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
  },
  heading2: {
    fontSize: 25,
    fontWeight: "bold",
  },
  itemContainer: {
    marginTop: 20,
    flexDirection: "row",
    marginVertical: 20,
  },
  divider: {
    width: "100%",
    height: 1,
    marginVertical: 15,
    backgroundColor: "#E4E4E4",
  },
  nameInitial: {
    backgroundColor: "#EAF0FF",
    color: "#3F539B",
    padding: 5,
    fontSize: 18,
    width: "10%",
    textAlign: "center",
    textAlignVertical: "center",
  },
  itemContent: {
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 16,
    fontStyle: "normal",
  },
  roleType: {
    color: "#747474",
  },
  userList: {
    paddingVertical: 5,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default CustomerScreen;
