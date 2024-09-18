import { httpRouter } from 'convex/server';
import { httpAction, internalMutation } from './_generated/server';
import { internal } from './_generated/api';

const http = httpRouter();

const handleClerkWebhook = httpAction(async (ctx, request) => {
  const { data, type } = await request.json();
  console.log('🚀 ~ handleClerkWebhook ~ type:', type);
  console.log('🚀 ~ handleClerkWebhook ~ data:', data);

  switch (type) {
    case 'user.created':
      const user = await ctx.runMutation(internal.users.createUser, {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email_addresses[0].email_address,
        imageUrl: data.image_url,
        username: data.username,
      });
      console.log('🚀 ~ handleClerkWebhook ~ user:', user);
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
