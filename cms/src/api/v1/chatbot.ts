import { Payload } from "payload";
import {
  Charakter,
  Nachrichten,
} from "../../payload-types";
import { markdownify } from "../markdown";

const characters = {
  transform: function (
    { name, emoji }: Charakter ) {
    return ({ name, emoji });
  },
  get: async (payload: Payload) =>
    await payload
      .find<Charakter>({
        collection: "chatbot-characters",
        limit: 1000,
      })
      .then((result) => result.docs)
      .then((entries) =>
        entries.map(characters.transform)
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
  characters: await characters.get(payload),
  messages: await messages.get(payload)
});
