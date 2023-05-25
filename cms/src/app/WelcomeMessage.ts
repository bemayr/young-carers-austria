import { GlobalConfig } from 'payload/types';
import { notifyGitHub } from '../util/hooks';

const WelcomeMessage: GlobalConfig = {
  slug: 'app-welcome',
  label: "Willkommensnachricht",
  access: {
    read: () => true
  },
  admin: {
    group: "App",
  },
  hooks: {
    afterChange: [ notifyGitHub ],
  },
  versions: {
    drafts: 
    {
      autosave: false
    }
  },
  fields: [
    {
      name: "hello",
      type: "richText",
      label: "Kurzer Text auf der allerersten Seite der App",
      required: true,
      admin: {
        elements: ["link", "ol", "ul"],
        leaves: ["bold"],
      }
    },
    {
      name: "info",
      type: "richText",
      label: "Information zur App in der Welcoming Experience",
      required: true,
      admin: {
        elements: ["link", "ol", "ul"],
        leaves: ["bold"],
      }
    },
    {
      name: "feedback",
      type: "richText",
      label: "Feedbackaufforderung in der Welcoming Experience",
      required: true,
      admin: {
        elements: ["link", "ol", "ul"],
        leaves: ["bold"],
      }
    },
  ],
}

export default WelcomeMessage;
