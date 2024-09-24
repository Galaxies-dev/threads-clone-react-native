import { useQuery } from 'convex/react';
import { useUser } from '@clerk/clerk-expo';
import { api } from '@/convex/_generated/api';

export function useUserProfile() {
  const { user } = useUser();
  const clerkId = user?.id;

  const userProfile = useQuery(api.users.getUserByClerkId, { clerkId });

  return {
    userProfile,
    isLoading: userProfile === undefined,
    error: userProfile === null,
  };
}
