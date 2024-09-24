import { v } from 'convex/values';
import { mutation, query, QueryCtx } from './_generated/server';
import { paginationOptsValidator } from 'convex/server';
import { getCurrentUserOrThrow } from './users';
import { Id } from './_generated/dataModel';

export const addThread = mutation({
  args: {
    content: v.string(),
    mediaFiles: v.optional(v.array(v.string())),
    websiteUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const message = await ctx.db.insert('messages', {
      ...args,
      userId: user._id,
      likeCount: 0,
      commentCount: 0,
      retweetCount: 0,
    });

    return message;
  },
});

export const getThreads = query({
  args: { paginationOpts: paginationOptsValidator, userId: v.optional(v.id('users')) },
  handler: async (ctx, args) => {
    let threads;
    if (args.userId) {
      threads = await ctx.db
        .query('messages')
        .filter((q) => q.eq(q.field('userId'), args.userId))
        .order('desc')
        .paginate(args.paginationOpts);
    } else {
      threads = await ctx.db.query('messages').order('desc').paginate(args.paginationOpts);
    }

    const threadsWithMedia = await Promise.all(
      threads.page.map(async (thread) => {
        const creator = await getMessageCreator(ctx, thread.userId);

        if (thread.mediaFiles && thread.mediaFiles.length > 0) {
          const urlPromises = thread.mediaFiles.map((file) =>
            ctx.storage.getUrl(file as Id<'_storage'>)
          );
          const results = await Promise.allSettled(urlPromises);
          const urls = results
            .filter(
              (result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled'
            )
            .map((result) => result.value);

          return {
            ...thread,
            mediaFiles: urls,
            creator,
          };
        }
        return {
          ...thread,
          creator,
        };
      })
    );

    return {
      ...threads,
      page: threadsWithMedia,
    };
  },
});

export const likeThread = mutation({
  args: {
    messageId: v.id('messages'),
  },
  handler: async (ctx, args) => {
    const message = await ctx.db.get(args.messageId);

    await ctx.db.patch(args.messageId, {
      likeCount: (message?.likeCount || 0) + 1,
    });
  },
});

const getMessageCreator = async (ctx: QueryCtx, userId: Id<'users'>) => {
  const user = await ctx.db.get(userId);
  if (!user?.imageUrl || user.imageUrl.startsWith('http')) {
    return user;
  }

  const url = await ctx.storage.getUrl(user.imageUrl as Id<'_storage'>);

  return {
    ...user,
    imageUrl: url,
  };
};

export const generateUploadUrl = mutation(async (ctx) => {
  await getCurrentUserOrThrow(ctx);

  return await ctx.storage.generateUploadUrl();
});
