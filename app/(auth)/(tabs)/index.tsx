import { StyleSheet, Text, View } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const Page = () => {
  const users = useQuery(api.users.get);
  console.log('🚀 ~ LoginScreen ~ users:', users);

  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};
export default Page;
const styles = StyleSheet.create({});
