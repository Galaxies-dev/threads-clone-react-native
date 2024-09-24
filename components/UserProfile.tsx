import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';
import { useUserProfile } from '@/hooks/useUserProfile';

type UserProfileProps = {
  clerkId?: string;
  userId?: string;
};

export const UserProfile = ({ clerkId, userId }: UserProfileProps) => {
  let profile;

  if (clerkId) {
    const { userProfile } = useUserProfile();
    profile = userProfile;
  } else if (userId) {
    // TODO
    // profile = useQuery(api.users.getUserById, { userId });
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileTextContainer}>
          <Text style={styles.name}>
            {profile?.first_name} {profile?.last_name}
          </Text>
          <Text style={styles.email}>{profile?.email}</Text>
        </View>
        <Image source={{ uri: profile?.imageUrl as string }} style={styles.image} />
      </View>

      <Text style={styles.bio}>{profile?.bio ? profile?.bio : 'No bio yet'}</Text>
      <Text>
        {profile?.followersCount} followers · {profile?.websiteUrl}
      </Text>

      <View style={styles.buttonRow}>
        <Link
          href={`/(modal)/edit-profile?biostring=${
            profile?.bio ? encodeURIComponent(profile?.bio) : ''
          }&linkstring=${profile?.websiteUrl ? encodeURIComponent(profile?.websiteUrl) : ''}&userId=${
            profile?._id
          }&imageUrl=${profile?.imageUrl ? encodeURIComponent(profile?.imageUrl) : ''}`}
          asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit profile</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Share profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileTextContainer: {
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bio: {
    fontSize: 14,
    marginTop: 16,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 16,
    gap: 16,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});
