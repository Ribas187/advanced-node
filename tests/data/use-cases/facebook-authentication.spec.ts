/* eslint-disable max-classes-per-file */
import { mock } from 'jest-mock-extended';
import { FacebookAuthenticationUseCase } from '@/data/use-cases';
import { AuthenticationError } from '@/domain/errors';
import { LoadFacebookUserApi } from '@/data/contracts/apis';

describe('FacebookAuthenticationUseCase', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApi = mock<LoadFacebookUserApi>();

    const sut = new FacebookAuthenticationUseCase(loadFacebookUserApi);

    await sut.perform({ token: 'dummy_token' });

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'dummy_token' });
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1);
  });

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserApi = mock<LoadFacebookUserApi>();

    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined);

    const sut = new FacebookAuthenticationUseCase(loadFacebookUserApi);

    const authResult = await sut.perform({ token: 'dummy_token' });

    expect(authResult).toEqual(new AuthenticationError());
  });
});
