import { AppRouteHandlerFnContext, handleAuth, handleLogin } from '@auth0/nextjs-auth0'
import { NextRequest } from 'next/server';

export const GET = handleAuth({
  signup: handleLogin({ authorizationParams: { screen_hint: 'signup' } }),
  login: handleLogin((request) => {
    if (request.url) {
      const url = new URL(request.url);
      const searchParams = url.searchParams /*new URLSearchParams(url.search);*/
      const organization = searchParams.get("organization");
      const invitation = searchParams.get("invitation");

      if (organization && invitation) {
        return {
          authorizationParams: {
            organization,
            invitation 
          }
        }
      }
    }
    return({});   
  })
});

/*
export default handleAuth({
  signup: handleLogin({ authorizationParams: { screen_hint: 'signup' } }),
  invite: handleLogin({
    authorizationParams: {
      invitation: req.query.invitation
    }
  })
});
*/