//
//  Chatbot.swift
//  Young Carers Austria
//
//  Created by Bernhard Mayr on 14.11.22.
//

import SwiftUI

struct Chatbot: View {
    var closeChatbot: () -> Void
    @State private var message = ""
    @FocusState private var messageIsFocused: Bool
    @EnvironmentObject var chatbotViewModel: ChatbotViewModel
    
    var body: some View {
        VStack(spacing: 0) {
            VStack {
                HStack {
                    Text(chatbotViewModel.character!.emoji)
                        .font(.title)
                    Text(chatbotViewModel.character!.name)
                        .font(.title3)
                        .bold()
                    Spacer()
                    Button(action: closeChatbot, label: {
                        ZStack {
                            Circle()
                                .fill(Color(.secondarySystemBackground))
                                .frame(width: 30, height: 30)
                            
                            Image(systemName: "xmark")
                                .font(.system(size: 15, weight: .bold, design: .rounded))
                                .foregroundColor(.secondary)
                        }
                        .padding(8)
                        .contentShape(Circle())
                    })
                    .buttonStyle(PlainButtonStyle())
                    .accessibilityLabel(Text("Close"))
                }
            }
            .padding(4)
            .padding(.leading)
            
            ScrollViewReader { value in
                ScrollView {
                    VStack {
                        ForEach(chatbotViewModel.messages) { message in
                            HStack {
                                switch message {
                                case .text(let sender, let text):
                                    switch sender {
                                    case .bot:
                                        Text(try! AttributedString(markdown: text))
                                            .padding()
                                            .background(Color(.tertiarySystemBackground))
                                            .cornerRadius(16)
                                        Spacer()
                                    case .user:
                                        HStack {
                                            Spacer()
                                            Text(text)
                                                .padding()
                                                .foregroundColor(.white)
                                                .background(Color.accentColor)
                                                .cornerRadius(16)
                                        }
                                    }
                                case .reference(_, let reference):
                                    HStack {
                                        ReferenceView.Entry(reference: reference)
                                            .frame(width: 300)
                                        Spacer()
                                    }
                                }
                            }
//                            .id(message.id)
                        }
                    }
                    .padding()
                    
//                    if (chatbotViewModel.botIsTyping) {
//                        TypingIndicator()
//                    }
                }
                .background(Color(.secondarySystemBackground))
//                .onChange(of: chatbotViewModel.messages.count) { other in
//                    value.scrollTo(chatbotViewModel.messages.last?.id)
//                    print("this is a test \(String(describing: chatbotViewModel.messages.last?.id))")
//                }
            }
            
            HStack {
                TextField("Womit kann ich dir helfen?", text: $message)
                    .padding()
                    .background(Color(.secondarySystemBackground))
                    .cornerRadius(16)
                    .keyboardType(.alphabet)
                    .focused($messageIsFocused)
                    .onSubmit {
                        Task {
                            await sendMessage()
                        }
                    }
                
                Button {
                    Task {
                        await sendMessage()
                    }
                } label: {
                    Image(systemName: "paperplane.fill")
                        .foregroundColor(.accentColor)
                }
                .font(.system(size: 26))
                .padding(.horizontal, 10)
            }
            .padding()
        }
    }
    
    func sendMessage() async {
        if !self.message.trimmingCharacters(in: .whitespaces).isEmpty {
            let tempMessage = self.message
            self.message = ""
            await chatbotViewModel.requestAnswer(message: tempMessage)
            messageIsFocused = false
        }
    }
}
