import SwiftUI

struct WelcomePage: View {
    var metadata: [MetadataEntry]
    var dismiss: () async -> Void
    
    var body: some View {
        let welcomeHello = metadata.first { $0.key == "welcome-hello" }
        let welcomeInfo = metadata.first { $0.key == "welcome-info" }
        let welcomeFeedback = metadata.first { $0.key == "welcome-feedback" }
        
        VStack {
            ScrollView {
                VStack(alignment: .leading) {
                    Text(welcomeHello!.content)
                        .font(.title)
                    
                    Markdown(welcomeInfo!.content)
                    
                    Text("Feedback")
                        .font(.headline)
                    .padding(.top, 24)
                    
                    Markdown(welcomeFeedback!.content)
                    
                    VStack(alignment: .center) {
//                        Spacer()
                        Button(action: {
                            Task.init {
                                await dismiss()
                            }
                        }, label: {
                            Text("➤ Informiere dich")
                                .foregroundColor(.highlightColor)
                                .textCase(.uppercase)
                        })
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.top)
                }
                .padding(24)
                .padding(.top, 32)
            }
            Image("yc_graphic")
                .resizable()
                .scaledToFit()
        }
//        .background(Color(.secondarySystemBackground))
        .ignoresSafeArea(.all, edges: .bottom)
    }
}
