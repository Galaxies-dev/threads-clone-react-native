import { Stack } from 'expo-router';
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modal)/create" options={{ presentation: 'modal' }} />
    </Stack>
  );
};
export default Layout;
