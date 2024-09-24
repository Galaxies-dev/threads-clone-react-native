import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { usePaginatedQuery, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Link, useNavigation } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  runOnJS,
} from 'react-native-reanimated';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { FlashList } from '@shopify/flash-list';
import Thread from '@/components/Thread';
import { Doc } from '@/convex/_generated/dataModel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ThreadComposer from '@/components/ThreadComposer';

const Page = () => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.messages.getThreads,
    {},
    { initialNumItems: 10 }
  );
  console.log(results);

  const { top } = useSafeAreaInsets();

  const navigation = useNavigation();
  // Create a shared value to store the scroll offset
  const scrollOffset = useSharedValue(0);
  const tabBarHeight = useBottomTabBarHeight();

  const updateTabbar = () => {
    let newMarginBottom = 0;
    if (scrollOffset.value >= 0 && scrollOffset.value <= tabBarHeight) {
      newMarginBottom = -scrollOffset.value;
    } else if (scrollOffset.value > tabBarHeight) {
      newMarginBottom = -tabBarHeight;
    }

    navigation.setOptions({ tabBarStyle: { marginBottom: newMarginBottom } });
  };

  // Create an animated scroll handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
      runOnJS(updateTabbar)();
    },
  });

  const onLoadmore = () => {
    console.log('load more');

    // loadMore(10);
  };

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      style={{ marginTop: top }}
      showsVerticalScrollIndicator={false}>
      <ThreadComposer isPreview />
      <FlashList
        data={results}
        renderItem={({ item }) => (
          <Link href={`/feed/${item._id}`} asChild>
            <TouchableOpacity>
              <Thread thread={item as Doc<'messages'> & { creator: Doc<'users'> }} />
            </TouchableOpacity>
          </Link>
        )}
        onEndReached={onLoadmore}
        onEndReachedThreshold={0.5}
        estimatedItemSize={200}
        contentContainerStyle={{ paddingTop: 16 }}
      />
    </Animated.ScrollView>
  );
};
export default Page;

const styles = StyleSheet.create({});
