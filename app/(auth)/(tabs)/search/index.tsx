import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Stack } from 'expo-router';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import ProfileSearchResult from '@/components/ProfileSearchResult';
import { Colors } from '@/constants/Colors';

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const userList = useQuery(api.users.searchUsers, search === '' ? 'skip' : { search });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Search',
          headerTitle: (props) => (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{props.children}</Text>
            </View>
          ),
          headerSearchBarOptions: {
            placeholder: 'Search',
            onChangeText: (event) => setSearch(event.nativeEvent.text),
            tintColor: '#000',
            autoFocus: true,
            hideWhenScrolling: false,
            onCancelButtonPress: () => {},
          },
        }}
      />
      <FlatList
        data={userList}
        contentInsetAdjustmentBehavior="automatic"
        ItemSeparatorComponent={() => (
          <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: Colors.border }} />
        )}
        ListEmptyComponent={() => <Text style={styles.emptyText}>No users found</Text>}
        renderItem={({ item }) => <ProfileSearchResult key={item._id} user={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  user: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});
