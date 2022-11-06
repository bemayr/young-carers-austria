import { buildConfig } from 'payload/config';
import path from 'path';
import Examples from './collections/Examples';
import Users from './collections/Users';

// app
import AppAccessibilityDeclaration from './app/AccessibilityDeclaration';
import AppCopyright from './app/Copyright';
import AppDataProtectionDeclaration from './app/DataProtectionDeclaration';
import AppImprint from './app/Imprint';
import AppWelcomeMessage from './app/WelcomeMessage';

// content
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

// website
import WebsiteAccessibilityDeclaration from './website/AccessibilityDeclaration';
import WebsiteCopyright from './website/Copyright';
import WebsiteDataProtectionDeclaration from './website/DataProtectionDeclaration';
import WebsiteImprint from './website/Imprint';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Examples,
    // chatbot
    ChatbotEmojis,
    ChatbotNames,
    // content
    Categories,
    References,
    Situations,
    Sources,
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
    Emergency,
    // website
    WebsiteAccessibilityDeclaration,
    WebsiteCopyright,
    WebsiteDataProtectionDeclaration,
    WebsiteImprint,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    disable: true
  },
});
