const execSync = require('child_process').execSync;

const environment = process.env.NODE_ENV;
const CHATBOT_BASE_URL = process.env.CHATBOT_BASE_URL;
const INSIGHTS_BASE_URL = process.env.INSIGHTS_BASE_URL;
const INSIGHTS_IDSITE = process.env.INSIGHTS_IDSITE;
const isProduction = environment === 'production';

if(!CHATBOT_BASE_URL) throw new Error("CHATBOT_BASE_URL not set");
if(!INSIGHTS_BASE_URL) throw new Error("INSIGHTS_BASE_URL not set");
if(!INSIGHTS_IDSITE) throw new Error("INSIGHTS_IDSITE not set");

const now = new Date();
const timeZone = 'UTC';
const buildTime = new Intl.DateTimeFormat('de-AT', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone,
}).format(now);

module.exports = {
  environment,
  isProduction,
  CHATBOT_BASE_URL,
  INSIGHTS_BASE_URL,
  INSIGHTS_IDSITE,
  time: {
    raw: now.toISOString(),
    formatted: `${buildTime}`,
  },
};
