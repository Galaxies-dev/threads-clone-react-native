import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
const Page = () => {
  const { id } = useLocalSearchParams();
  console.log('🚀 ~ Page ~ id:', id);
  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};
export default Page;
const styles = StyleSheet.create({});
