import "server-only";

import { CredentialsMethod, OpenFgaClient } from "@openfga/sdk";

export const fgaClient = new OpenFgaClient({
  apiUrl: process.env.FGA_API_URL,
  storeId: process.env.FGA_STORE_ID,
  authorizationModelId: process.env.FGA_AUTHORIZATION_MODEL_ID,
  credentials: {
    method: CredentialsMethod.ClientCredentials,
    config: {
      apiTokenIssuer: process.env.FGA_API_TOKEN_ISSUER as string,
      apiAudience: process.env.FGA_API_AUDIENCE as string,
      clientId: process.env.FGA_CLIENT_ID as string,
      clientSecret: process.env.FGA_CLIENT_SECRET as string,
    },
  },
});

export function stripObjectName(object: string): string {
  const id = object.match(/(?<=:).*/g);
  return id ? id[0] : "";
}
