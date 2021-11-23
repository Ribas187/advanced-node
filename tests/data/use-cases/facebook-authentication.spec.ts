/* eslint-disable max-classes-per-file */
import { mock, MockProxy } from 'jest-mock-extended';
import { FacebookAuthenticationUseCase } from '@/data/use-cases';
import { AuthenticationError } from '@/domain/errors';
import { LoadFacebookUserApi } from '@/data/contracts/apis';

type SutTypes = {
  sut: FacebookAuthenticationUseCase;
  loadFacebookUserApi: MockProxy<LoadFacebookUserApi>;
};

const makeSut = (): SutTypes => {
  const loadFacebookUserApi = mock<LoadFacebookUserApi>();
  const sut = new FacebookAuthenticationUseCase(loadFacebookUserApi);

  return {
    sut,
    loadFacebookUserApi,
  };
};

describe('FacebookAuthenticationUseCase', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const { sut, loadFacebookUserApi } = makeSut();

    await sut.perform({ token: 'dummy_token' });

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({
      token: 'dummy_token',
    });
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1);
  });

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const { sut, loadFacebookUserApi } = makeSut();

    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined);

    const authResult = await sut.perform({ token: 'dummy_token' });

    expect(authResult).toEqual(new AuthenticationError());
  });
});
