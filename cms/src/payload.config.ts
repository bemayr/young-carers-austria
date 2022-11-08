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

import { contentV1 } from "./api/content.v1";

export default buildConfig({
  admin: {
    user: Users.slug
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
      path: "/api/content/v1",
      method: "get",
      root: true,
      handler: contentV1
    }
  ]
});
