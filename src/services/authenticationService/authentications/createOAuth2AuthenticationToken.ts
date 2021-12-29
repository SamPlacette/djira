import { Config } from '../../../config.ts';

export function createOAuth2AuthenticationToken(authenticationData: Config.Authentication.OAuth2) {
  return `Bearer ${authenticationData.accessToken}`;
}
