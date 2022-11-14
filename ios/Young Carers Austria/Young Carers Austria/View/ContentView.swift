import SwiftUI

struct ContentView: View {
    @EnvironmentObject var viewModel: ViewModel
    @State private var selection: Tab = .insights
    
    enum Tab {
        case insights, categories, emergency, about
    }
    
    struct TabViewItem<Page: View>: View {
        var tab: Tab
        var label: String
        var icon: String
        let viewBuilder: () -> Page
        
        init(_ tab: Tab, label: String, icon: String, @ViewBuilder builder: @escaping () -> Page) {
            self.tab = tab
            self.label = label
            self.icon = icon
            self.viewBuilder = builder
        }
        
        var body: some View {
            NavigationView {
                viewBuilder()
            }
            .tabItem {
                Label(label, image: icon)
            }
            .tag(tab)
        }
    }
    
    func refreshContent() async {
        await viewModel.loadContent()
    }

    var body: some View {
        if let content = viewModel.content {
            if (viewModel.showLaunchScreen ?? true) {
                WelcomePage(metadata: content.metadata, dismiss: viewModel.completeWelcomeScreen)
            }
            else {
                TabView(selection: $selection) {
                    TabViewItem(.insights, label: "Hilfe", icon: "alert_fragezeichen") {
                        InsightsPage(help: content.help, insights: content.insights, faqs: content.faqs, refreshContent: refreshContent)
                    }
                    TabViewItem(.categories, label: "Infos", icon: "alert_tipp") {
                        CategoriesPage(infos: content.infos, categories: content.abc)
                    }
                    TabViewItem(.emergency, label: "Im Notfall", icon: "themen_gesundheit_notfaelle") {
                        EmergencyPage(emergency: content.emergency)
                    }
                    TabViewItem(.about, label: "Über", icon: "more") {
                        AboutPage(metadata: content.metadata, contentTimestamp: content.timestamp)
                    }
                }
            }
        }
        else {
            VStack {
                ProgressView()
                Text("Daten werden geladen...")
            }
        }
    }
}
