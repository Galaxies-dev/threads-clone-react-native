import { useLocalSearchParams } from 'expo-router';
import Profile from '@/components/Profile';
import { Id } from '@/convex/_generated/dataModel';

const Page = () => {
  const { id } = useLocalSearchParams();

  return <Profile userId={id as Id<'users'>} showBackButton />;
};
export default Page;
