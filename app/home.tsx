import { Member, RootStackParamList } from "@/types/navigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type DirectoryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Directory"
>;

export default function HomeScreen() {
  const router = useRouter();
  const navigation = useNavigation<DirectoryScreenNavigationProp>();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);

  function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://nyc.cloud.appwrite.io/v1/storage/buckets/68f8f011001a9b3cb4b7/files/68f8f0210008faf4ed4d/view?project=68f8ec9400054fdf0c05&mode=admin");
        const json = await response.json();
        setMembers(json);
        setFilteredMembers(json);
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: "center" }} />;

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    const filtered = members.filter((member) => {
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
      return fullName.includes(text.toLowerCase());
    });
    setFilteredMembers(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name..."
        value={searchQuery}
        onChangeText={handleSearch}
        placeholderTextColor="#999"
      />
      <FlatList
        data={filteredMembers}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }: { item: Member }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: "/profile", params: { member: JSON.stringify(item) } })}
          >
            <Image source={{ uri: item.imageURL }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
              <Text style={styles.classification}>{capitalizeWords(item.classification)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#952727ff",
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    alignItems: "center",
    shadowColor: "#000000ff",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  classification: {
    fontSize: 14,
    color: "#f2ca00ff" },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },
  error: {
    color: "red",
    textAlign: "center"
  },
  info: {
    flex: 1
  },
  item: {
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: "#ccc"
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "600"
  },
  relationship: {
    fontSize: 13,
    color: "#999"
  },
  searchBar: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 12,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  }
});