import { v } from 'convex/values';
import { internalMutation, query } from './_generated/server';

export const get = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    return await ctx.db.query('users').collect();
  },
});

export const createUser = internalMutation({
  args: {
    id: v.string(),
    email: v.string(),
    first_name: v.optional(v.string()),
    last_name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    username: v.union(v.string(), v.null()),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert('users', args);
    return userId;
  },
});
