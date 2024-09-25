import { View } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import Thread from '@/components/Thread';
import { Doc } from '@/convex/_generated/dataModel';

interface CommentsProps {
  threadId: Id<'messages'>;
}

const Comments = ({ threadId }: CommentsProps) => {
  const comments = useQuery(api.messages.getThreadComments, {
    messageId: threadId,
  });

  return (
    <View>
      {comments?.map((comment) => (
        <Thread key={comment._id} thread={comment as Doc<'messages'> & { creator: Doc<'users'> }} />
      ))}
    </View>
  );
};
export default Comments;
