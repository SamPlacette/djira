import { Config } from '../../../utils/config.ts';
import { encode } from 'https://deno.land/std@0.209.0/encoding/base64.ts';

export function createBasicAuthenticationToken(authenticationData: Config.Authentication.Basic) {
  let login;
  let secret;

  if ('username' in authenticationData) {
    login = authenticationData.username;
    secret = authenticationData.password;
  } else {
    login = authenticationData.email;
    secret = authenticationData.apiToken;
  }

  const token = encode(`${login}:${secret}`);

  return `Basic ${token}`;
}
