//
//  ContentView.swift
//  youngCarers
//
//  Created by Christoph Bachl on 23.06.22.
//

import SwiftUI

let secondsToDelay = 3.0

var responseLinks = [
    "24-Stunden-Betreuung": "https://www.sozialministerium.at/Themen/Pflege/24-Stunden-Betreuung.html",
    "Pflege": "https://www.sozialministerium.at/Themen/Pflege.html",
    "Betreuung": "https://www.sozialministerium.at/Themen/Pflege/Betreuende-und-Pflegende-Angehoerige.html",
    "Gesundheit": "https://www.sozialministerium.at/Themen/Gesundheit.html",
    "sind": "https://bemayr.github.io/young-carers-austria/abc/allgemeines/"
   
]
let keywordsString = [
   "24 STUNDEN BETREUUNG",
   "24-STUNDEN-BETREUUNG",
   "PFLEGE",
   "BETREUUNG",
   "GESUNDHEIT",
   "DEMENZ",
   "MINISTERIUM",
   "YOUNG CARERS",
   "ALLGEMEINES",
   "ANGEHÖRIGENGESPRÄCH",
   "BERATUNG UND PFLEGETIPPS",
   "CHATTEN",
   "BERATUNG",
   "COVID 19",
   "CORONAVIRUS",
   "DEMENZ",
   "DIENSTLEISTUNGEN",
   "DIENSTE",
   "ENTSPANNUNGSTIPPS",
   "ERFAHRUNGSBERICHTE",
   "ERSTE HILFE",
   "HILFE",
   "FAMILIE",
   "FINANZIELLES",
   "FREIZEITANGEBOT",
   "GESUNDHEITSPORTAL",
   "INFO",
   "INFOSERVICE",
   "SPITAL",
   "KRANKENHAUS",
   "NOTFALL",
   "PFLEGEGELD",
   "RECHT",
   "SCHULE",
   "GELD",
   "SELBSTHILFEGRUPPE"
    
    
]

let botName = ["Marc","Lisa","Bernhard","Sam"]
let randomBot = botName.randomElement()!

struct ContentView: View {

    
    
    @State private var messageText = ""
        @State var messages: [String] =
    ["Hallo! Willkommen beim Young Carers Chatbot! 👋 ", "Mein Name ist \(randomBot) "  ,"Wie kann ich dir helfen? 🤔", "Schreib mir doch einfach eine Frage." ,"Meine künstliche Intelligenz macht den Rest 🙂"]
       
    let questionAnswerer = MyQuestionAnswerer()
    let count = 0
   
    
        var body: some View {
            VStack {
                HStack {
                    Text(randomBot)
                        .font(.largeTitle)
                        .bold()
                        .foregroundColor(.red)
                    
                    Image(systemName: "bubble.left.fill")
                        .font(.system(size: 26))
                        .foregroundColor(Color.red)
                }
                
                ScrollView {
                    ForEach(messages, id: \.self) { message in
                        // If the message contains [USER], that means it's us
                        if message.contains("[USER]") {
                           
                            let newMessage = message.replacingOccurrences(of: "[USER]", with: "")
                            
                            
                            // User message styles
                            HStack {
                                Spacer()
                                Text(newMessage)
                                    .padding()
                                    .foregroundColor(Color.white)
                                    .background(Color.red.opacity(0.8))
                                    .cornerRadius(10)
                                    .padding(.horizontal, 16)
                                    .padding(.bottom, 10)
                            }
                        } else {
                            
                            // Bot message styles
                            HStack {
                                /*Text(message)
                                    .padding()
                                    .background(Color.gray.opacity(0.15))
                                    .cornerRadius(10)
                                    .padding(.horizontal, 16)
                                    .padding(.bottom, 10)*/
                                if message.contains(":") {
                                    
                                    let content = message.components(separatedBy: " ")
                                
                                    //let result = key.filter{ content.contains($0) }
                                    let link = responseLinks[content[2]]
                                    
                                    let mes = message + " " + "[Link](\(link!))"
                                    
                                    Text(.init(mes))
                                        .padding()
                                        .background(Color.gray.opacity(0.15))
                                        .cornerRadius(10)
                                        .padding(.horizontal, 16)
                                        .padding(.bottom, 10)
                                    
                                    //Link("Link", destination: URL(string: //"https://www.sozialministerium.at/Themen/Pflege/24-Stunden-Betreuung.html")!)
                                }else {
                                    Text(message)
                                        .padding()
                                        .background(Color.gray.opacity(0.15))
                                        .cornerRadius(10)
                                        .padding(.horizontal, 16)
                                        .padding(.bottom, 10)
                                }
                                
                                Spacer()
                            }
                            
                        }
                        
                    }.rotationEffect(.degrees(180))
                }
                .rotationEffect(.degrees(180))
                .background(Color.gray.opacity(0.1))
                
                
                // Contains the Message bar
                HStack {
                    TextField("Schreibe mir was", text: $messageText)
                        .padding()
                        .background(Color.gray.opacity(0.1))
                        .cornerRadius(10)
                        .onSubmit {
                            sendMessage(message: messageText)
                        }
                    
                    Button {
                        sendMessage(message: messageText)
                    } label: {
                        Image(systemName: "paperplane.fill")
                            .foregroundColor(.red)
                    }
                    .font(.system(size: 26))
                    .padding(.horizontal, 10)
                }
                .padding()
            }
        }
        
        func sendMessage(message: String) {
            withAnimation {
                messages.append("[USER]" + message)
                self.messageText = ""
                
                DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                    withAnimation {
                        messages.append(respondToQuestion(message: message))
                        
                        DispatchQueue.main.asyncAfter(deadline: .now() + secondsToDelay) {
                           print("This message is delayed")
                            messages.append(respondToQuestion(message: "next"))
                           // Put any code you want to be delayed here
                        }
                        
                            //getBotResponse(message: message))
                    }
                }
            }
        }

    func respondToQuestion(message: String) -> String {
        questionAnswerer.responseTo(question: message)
        

    }
    func delayOfMessage(){
        DispatchQueue.main.asyncAfter(deadline: .now() + secondsToDelay) {
           print("This message is delayed")
        }
    }

    

}

    struct ContentView_Previews: PreviewProvider {
        static var previews: some View {
            ContentView()
        }
    }


