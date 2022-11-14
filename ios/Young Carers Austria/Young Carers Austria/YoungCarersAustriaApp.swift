import SwiftUI

@main
struct YoungCarersAustriaApp: App {
    @StateObject private var viewModel = ViewModel()
    @StateObject private var chatbotViewModel = ChatbotViewModel()
    
    init() {
        // Set the Navigation Bar Title Color (not yet available in SwiftUI)
        UINavigationBar.appearance().largeTitleTextAttributes = [.foregroundColor: UIColor(Color.accentColor)]
        UINavigationBar.appearance().titleTextAttributes = [.foregroundColor: UIColor(Color.accentColor)]
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(viewModel)
                .environmentObject(chatbotViewModel)
                .task {
                    await viewModel.loadContent()
                    await chatbotViewModel.loadCharacter()
                }
        }
    }
}
