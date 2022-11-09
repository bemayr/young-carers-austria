import { Payload } from "payload";
import {
  Emoji,
  Nachrichten,
  Name,
} from "../../payload-types";
import { markdownify } from "../markdown";

const emojis = {
  transform: function (
    entry: Emoji  ) {
    return entry.emoji;
  },
  get: async (payload: Payload) =>
    await payload
      .find<Emoji>({
        collection: "chatbot-emojis",
        limit: 1000,
      })
      .then((result) => result.docs)
      .then((entries) =>
        entries.map(emojis.transform)
      ),
};

const names = {
  transform: function (
    entry: Name  ) {
    return entry.name;
  },
  get: async (payload: Payload) =>
    await payload
      .find<Name>({
        collection: "chatbot-names",
        limit: 1000,
      })
      .then((result) => result.docs)
      .then((entries) =>
        entries.map(names.transform)
      ),
};

const messages = {
  transform: function (entry: Nachrichten) {
    return {
      welcome: entry.welcome.choices.map(choice => choice.messages.map(message => markdownify(message.message))),
      notfound: entry["no-result-found"].choices.map(choice => choice.messages.map(message => markdownify(message.message))),
      found: entry["results-found"].choices.map(choice => choice.messages.map(message => markdownify(message.message))),
    };
  },
  get: async (payload: Payload) =>
    await payload
      .findGlobal<Nachrichten>({ slug: "chatbot-messages" })
      .then(messages.transform),
}

export const getChatbotData = async (payload: Payload) => ({
  emojis: await emojis.get(payload),
  names: await names.get(payload),
  messages: await messages.get(payload)
});
