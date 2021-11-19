/* eslint-disable max-classes-per-file */
import { FacebookAuthentication } from '@/domain/features';

class FacebookAuthenticationUseCase {
  constructor(
    private readonly loadFacebookUserApi: LoadFacebookUserApi,
  ) {}

  async perform(
    params: FacebookAuthentication.Params,
  ): Promise<void> {
    await this.loadFacebookUserApi.loadUser(params);
  }
}

interface LoadFacebookUserApi {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<void>;
}

namespace LoadFacebookUserApi {
  export type Params = {
    token: string;
  };
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string;

  async loadUser({ token }: LoadFacebookUserApi.Params): Promise<void> {
    this.token = token;
  }
}

describe('FacebookAuthenticationUseCase', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy();

    const sut = new FacebookAuthenticationUseCase(loadFacebookUserApi);

    await sut.perform({ token: 'dummy_token' });

    expect(loadFacebookUserApi.token).toBe('dummy_token');
  });
});
