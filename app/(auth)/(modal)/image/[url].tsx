import { StyleSheet, View } from 'react-native';
import { ImageZoom } from '@likashefqet/react-native-image-zoom';
import { useLocalSearchParams } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Page = () => {
  const { url } = useLocalSearchParams<{
    url: string;
  }>();

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <ImageZoom
          uri={url}
          minScale={0.5}
          maxScale={5}
          minPanPointers={1}
          doubleTapScale={2}
          isSingleTapEnabled
          isDoubleTapEnabled
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </GestureHandlerRootView>
  );
};
export default Page;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
