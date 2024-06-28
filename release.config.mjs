import github from '@semantic-release/github';
import npm from '@semantic-release/npm';
import commitAnalyzer from '@semantic-release/commit-analyzer';
import releaseNotesGenerator from '@semantic-release/release-notes-generator';


/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: ["main", "next"],
  plugins: [commitAnalyzer, releaseNotesGenerator, github, npm],
};
