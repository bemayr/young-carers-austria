import Foundation

enum Message: Identifiable {
    var id: Int {
        switch self {
        case let .text(_, content):
            return "text:\(content)".hashValue
        case let .reference(id, _):
            return "reference:\(id)".hashValue
        }
    }
    
    case text(sender: Sender, content: String)
    case reference(id: String, content: Reference)
    
    enum Sender {
        case bot
        case user
    }
}

@MainActor
final class ChatbotViewModel: ObservableObject {
    @Published var character: Character? = nil
    @Published var messages: [Message] = []
    @Published var botIsTyping: Bool = false
    
    func loadCharacter() async {
        character = await ChatbotModel.shared.loadCharacter()
    }
    
    func initialize() async {
        botIsTyping = true
        let welcomeMessages = await ChatbotModel.shared.loadWelcomeMessages()
        messages = welcomeMessages.map { .text(sender: .user, content: $0) }
        botIsTyping = false
    }
    
    func requestAnswer(message: String) async {
        botIsTyping = true
        messages.append(.text(sender: .user, content: message))
        if let answer = await ChatbotModel.shared.requestAnswer(message: message) {
            switch answer {
            case let .notFound(messages):
                self.messages.append(contentsOf:
                    messages.map { .text(sender: .bot, content: $0) })
            case let .found(messages, results):
                self.messages.append(contentsOf:
                    messages.map { .text(sender: .bot, content: $0) })
                self.messages.append(contentsOf:
                    results.map { result in
                    switch result {
                    case let .reference(id, reference):
                        return Message.reference(id: id, content: reference)
                    }
                })
            }
        }
        botIsTyping = false
    }
}
