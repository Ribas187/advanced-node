import { LoadFacebookUserApi } from '../contracts/apis';
import { FacebookAuthentication } from '@/domain/features';
import { AuthenticationError } from '@/domain/errors';

export class FacebookAuthenticationUseCase {
  constructor(private readonly loadFacebookUserApi: LoadFacebookUserApi) {}

  async perform(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookUserApi.loadUser(params);
    return new AuthenticationError();
  }
}
