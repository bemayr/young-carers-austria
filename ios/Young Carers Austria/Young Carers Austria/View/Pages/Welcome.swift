import SwiftUI

struct WelcomePage: View {
    var metadata: [MetadataEntry]
    
    var body: some View {
        let welcomeHello = metadata.first { $0.key == "welcome-hello" }
        let welcomeInfo = metadata.first { $0.key == "welcome-info" }
        let welcomeFeedback = metadata.first { $0.key == "welcome-feedback" }
        
        ScrollView {
            VStack {
                Markdown(welcomeHello!.content)
                Markdown(welcomeInfo!.content)
                Markdown(welcomeFeedback!.content)
            }
        }
        .navigationTitle("Willkommen")
        .padding([.horizontal])
        .background(Color(.secondarySystemBackground))
    }
}
