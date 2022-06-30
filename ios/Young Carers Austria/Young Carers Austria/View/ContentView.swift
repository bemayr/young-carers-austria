import SwiftUI

struct ContentView: View {
    @EnvironmentObject var viewModel: ViewModel
    @State private var selection: Tab = .insights
    
    enum Tab {
        case insights, abc, emergency, about
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

    var body: some View {
        if let content = viewModel.content {
            TabView(selection: $selection) {
                TabViewItem(.insights, label: "Hilfe", icon: "alert_fragezeichen") {
                    InsightsPage(insights: content.insights)
                }
                TabViewItem(.abc, label: "Infos", icon: "alert_tipp") {
                    AlphabetPage(categories: content.abc)
                }
                TabViewItem(.emergency, label: "Im Notfall", icon: "themen_gesundheit_notfaelle") {
                    EmergencyPage(emergency: content.emergency)
                }
                TabViewItem(.about, label: "Über", icon: "more") {
                    AboutPage(metadata: content.metadata, contentTimestamp: content.timestamp)
                }
            }
        }
        else {
            VStack {
                ProgressView()
                Text("Daten werden geladen...")
            }.onAppear() {
                viewModel.loadContent()
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
            .environmentObject(PreviewViewModel())
    }
}

final class PreviewViewModel: ObservableObject {
    @Published var content: Content = previewContent
}

let previewContent: Content = load("content.json")

func load<T: Decodable>(_ filename: String) -> T {
    let data: Data

    guard let file = Bundle.main.url(forResource: filename, withExtension: nil)
    else {
        fatalError("Couldn't find \(filename) in main bundle.")
    }

    do {
        data = try Data(contentsOf: file)
    } catch {
        fatalError("Couldn't load \(filename) from main bundle:\n\(error)")
    }

    do {
        let decoder = JSONDecoder()
        return try decoder.decode(T.self, from: data)
    } catch {
        fatalError("Couldn't parse \(filename) as \(T.self):\n\(error)")
    }
}
