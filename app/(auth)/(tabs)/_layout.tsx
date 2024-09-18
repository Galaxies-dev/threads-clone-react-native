import { Tabs } from 'expo-router';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
const Layout = () => {
  const { signOut } = useAuth();
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity onPress={() => signOut()}>
              <Text>Log out</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
};
export default Layout;
const styles = StyleSheet.create({});
