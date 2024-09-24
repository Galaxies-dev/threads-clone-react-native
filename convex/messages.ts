import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { paginationOptsValidator } from 'convex/server';
import { getCurrentUserOrThrow } from './users';

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
    if (args.userId) {
      const threads = await ctx.db
        .query('messages')
        .filter((q) => q.eq(q.field('userId'), args.userId))
        .order('desc')
        .paginate(args.paginationOpts);
      return threads;
    } else {
      const threads = await ctx.db.query('messages').order('desc').paginate(args.paginationOpts);
      return threads;
    }
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  await getCurrentUserOrThrow(ctx);

  return await ctx.storage.generateUploadUrl();
});
