const execSync = require('child_process').execSync;

const environment = process.env.NODE_ENV;
const isProduction = environment === 'production';
const baseUrl =
  environment === isProduction
    ? 'https://www.young-carers-austria.at'
    : 'http://localhost:8080';

const now = new Date();
const timeZone = 'UTC';
const buildTime = new Intl.DateTimeFormat('de-AT', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone,
}).format(now);

const latestGitCommitHash = execSync('git rev-parse --short HEAD')
  .toString()
  .trim();

module.exports = {
  environment,
  isProduction,
  baseUrl,
  time: {
    raw: now.toISOString(),
    formatted: `${buildTime}`,
  },
  hash: latestGitCommitHash,
};
