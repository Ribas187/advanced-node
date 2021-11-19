/* eslint-disable max-classes-per-file */
import { LoadFacebookUserApi } from '@/data/contracts/apis';
import { FacebookAuthenticationUseCase } from '@/data/use-cases';
import { AuthenticationError } from '@/domain/errors';

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string;

  result = undefined;

  async loadUser({ token }: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.token = token;
    return this.result;
  }
}

describe('FacebookAuthenticationUseCase', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy();

    const sut = new FacebookAuthenticationUseCase(loadFacebookUserApi);

    await sut.perform({ token: 'dummy_token' });

    expect(loadFacebookUserApi.token).toBe('dummy_token');
  });

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy();
    loadFacebookUserApi.result = undefined;

    const sut = new FacebookAuthenticationUseCase(loadFacebookUserApi);

    const authResult = await sut.perform({ token: 'dummy_token' });

    expect(authResult).toEqual(new AuthenticationError());
  });
});
