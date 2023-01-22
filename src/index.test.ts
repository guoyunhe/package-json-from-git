import { getPackageJsonFromGit } from '.';

describe('hello()', () => {
  it('gets repository, homepage, bugs and author', async () => {
    expect(await getPackageJsonFromGit()).toEqual({
      author: {
        email: 'i@guoyunhe.me',
        name: 'Guo Yunhe',
      },
      bugs: {
        url: 'https://github.com/guoyunhe/package-json-from-git/issues',
      },
      homepage: 'https://github.com/guoyunhe/package-json-from-git#readme',
      repository: {
        type: 'git',
        url: 'git+https://github.com/guoyunhe/package-json-from-git.git',
      },
    });
  });
});
