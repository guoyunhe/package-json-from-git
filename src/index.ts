import gitUrlParse from 'git-url-parse';
import { simpleGit } from 'simple-git';

export interface PackageJsonFromGit {
  repository?: {
    type: string;
    url: string;
  };
  homepage?: string;
  bugs?: { url: string };
  author?: { name: string; email: string };
  funding?: string;
}

/**
 * Get repository, homepage, bugs, author from .git
 */
export async function getPackageJsonFromGit(baseDir?: string): Promise<PackageJsonFromGit> {
  const git = simpleGit(baseDir);
  let result: PackageJsonFromGit = {};
  try {
    const remotes = await git.getRemotes(true);
    const { latest } = await git.log({ maxCount: 1 });
    const gitUrl = remotes.find((remote) => remote.name === 'origin')?.refs.fetch;
    if (gitUrl) {
      const gitUrlInfo = gitUrlParse(gitUrl);
      const httpsGitUrl = gitUrlInfo.toString('https');
      const homepage = httpsGitUrl.substring(0, httpsGitUrl.length - 4);
      let funding: string | undefined = undefined;
      if (gitUrlInfo.source === 'github.com') {
        funding = `https://github.com/sponsors/${gitUrlInfo.owner}`;
      }
      result = {
        ...result,
        homepage: homepage + '#readme',
        bugs: {
          url: homepage + '/issues',
        },
        repository: { type: 'git', url: 'git+' + httpsGitUrl },
        funding,
      };
    }
    if (latest) {
      result = {
        ...result,
        author: {
          name: latest.author_name,
          email: latest.author_email,
        },
      };
    }
  } catch (e) {
    // Not a Git repo
  }
  return result;
}
