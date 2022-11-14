//
//  Chatbot.swift
//  Young Carers Austria
//
//  Created by Bernhard Mayr on 14.11.22.
//

import SwiftUI

struct Chatbot: View {
    @EnvironmentObject var chatbotViewModel: ChatbotViewModel
    
    var body: some View {
        VStack {
            ForEach(chatbotViewModel.messages) { message in
                switch message {
                case .text(let sender, let text):
                    switch sender {
                    case .bot: Text(text)
                    case .user: Text(text)
                    }
                case .reference(_, let reference):
                    ReferenceView.Entry(reference: reference)
                        .padding([.vertical])
                }
            }
            
            if (chatbotViewModel.botIsTyping) {
                TypingIndicator()
            }
        }
    }
}
