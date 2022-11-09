import { buildConfig, } from 'payload/config';
import path from 'path';

// admin
import Users from './collections/Users';

// app
import AppAccessibilityDeclaration from './app/AccessibilityDeclaration';
import AppCopyright from './app/Copyright';
import AppDataProtectionDeclaration from './app/DataProtectionDeclaration';
import AppImprint from './app/Imprint';
import AppWelcomeMessage from './app/WelcomeMessage';

// chatbot
import ChatbotEmojis from './chatbot/Emojis';
import ChatbotMessages from './chatbot/Messages';
import ChatbotNames from './chatbot/Names';

// content
import Categories from './content/Categories';
import Emergency from './content/Emergency';
import References from './content/References';
import Situations from './content/Situations';
import Sources from './content/Sources';
import FAQ from './content/FAQ';
import Infos from './content/Infos';
import Help from './content/Help';

// website
import WebsiteAccessibilityDeclaration from './website/AccessibilityDeclaration';
import WebsiteCopyright from './website/Copyright';
import WebsiteDataProtectionDeclaration from './website/DataProtectionDeclaration';
import WebsiteImprint from './website/Imprint';
import LandingPage from './website/LandingPage';

import { contentV1 } from "./api/content.v2";
import api_v1 from "./api/v1";

const createGitHubActionsNotificationPath = path.resolve(__dirname, 'util/github-actions.js');
const mockModulePath = path.resolve(__dirname, 'mocks/emptyObject.js');

export default buildConfig({
  admin: {
    user: Users.slug,
    webpack: (config) => ({
      ...config,
      resolve: {
          ...config.resolve,
          alias: {
              ...config.resolve?.alias,
              [createGitHubActionsNotificationPath]: mockModulePath,
          }
      }
    })
  },
  collections: [
    // content
    Categories,
    References,
    Situations,
    Sources,
    // chatbot
    ChatbotEmojis,
    ChatbotNames,
    // admin
    Users,
  ],
  globals: [
    // app
    AppAccessibilityDeclaration,
    AppCopyright,
    AppDataProtectionDeclaration,
    AppImprint,
    AppWelcomeMessage,
    // chatbot
    ChatbotMessages,
    // content
    FAQ,
    Help,
    Infos,
    Emergency,
    // website
    WebsiteAccessibilityDeclaration,
    WebsiteCopyright,
    WebsiteDataProtectionDeclaration,
    WebsiteImprint,
    LandingPage,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    disable: true
  },
  endpoints: [
    {
      path: "/api/v2",
      method: "get",
      root: true,
      handler: contentV1
    },
    {
      path: "/api/v1/app",
      method: "get",
      root: true,
      handler: async ({payload}, res) => res.json(await api_v1.getAppData(payload))
    },
    {
      path: "/api/v1/chatbot",
      method: "get",
      root: true,
      handler: async function({payload}, res) { res.json(await api_v1.getChatbotData(payload)) }
    },
    {
      path: "/api/v1/content",
      method: "get",
      root: true,
      handler: async ({payload}, res) => res.json(await api_v1.getContent(payload))
    },
    {
      path: "/api/v1/website",
      method: "get",
      root: true,
      handler: async ({payload}, res) => res.json(await api_v1.getWebsiteData(payload))
    }
  ]
});
