import { httpRouter } from 'convex/server';
import { httpAction } from './_generated/server';
import { internal } from './_generated/api';

const http = httpRouter();

const handleClerkWebhook = httpAction(async (ctx, request) => {
  const { data, type } = await request.json();

  switch (type) {
    case 'user.created':
      await ctx.runMutation(internal.users.createUser, {
        clerkId: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email_addresses[0].email_address,
        imageUrl: data.image_url,
        username: data.username,
        followersCount: 0,
      });

      break;
    case 'user.deleted':
      break;
    default:
      break;
  }
  return new Response(null, { status: 200 });
});

http.route({
  path: '/clerk-users-webhook',
  method: 'POST',
  handler: handleClerkWebhook,
});

export default http;
