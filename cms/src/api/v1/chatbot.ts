import { Payload } from "payload";
import { markdownify } from "../markdown";
import { ChatbotCharacter, ChatbotMessage } from "payload/generated-types";

const characters = {
  transform: function ({ name, emoji }: ChatbotCharacter) {
    return { name, emoji };
  },
  get: async (payload: Payload) =>
    await payload
      .find({
        collection: "chatbot-characters",
        limit: 1000,
      })
      .then((result) => result.docs)
      .then((entries) => entries.map(characters.transform)),
};

const messages = {
  transform: function (entry: ChatbotMessage) {
    return {
      welcome: entry.welcome.choices.map((choice) =>
        choice.messages.map((message) => markdownify(message.message))
      ),
      notfound: entry["no-result-found"].choices.map((choice) =>
        choice.messages.map((message) => markdownify(message.message))
      ),
      found: entry["results-found"].choices.map((choice) =>
        choice.messages.map((message) => markdownify(message.message))
      ),
      feedback: entry.feedback.choices.map((choice) =>
        choice.messages.map((message) => markdownify(message.message))
      ),
    };
  },
  get: async (payload: Payload) =>
    await payload
      .findGlobal({ slug: "chatbot-messages" })
      .then(messages.transform),
};

export const getChatbotData = async (payload: Payload) => ({
  characters: await characters.get(payload),
  messages: await messages.get(payload),
});
