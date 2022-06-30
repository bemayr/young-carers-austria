import Foundation

@MainActor
class ViewModel: ObservableObject {
    @Published var content: Content? = nil
    
    func loadContent() {
        Task {
            do {
                if await (!Model.shared.hasBeenCached()) {
                    let data = try await Model.shared.loadContentFromBundle()
                    content = try await Model.shared.parseContent(data!)
                }
                else {
                    let data = try await Model.shared.loadContentFromCache()
                    content = try await Model.shared.parseContent(data!)
                }
                
                // refresh data
                let data = try await Model.shared.loadContentFromNetwork()
                content = try await Model.shared.parseContent(data)
                try await Model.shared.cacheContent(content: data)
            } catch {
                print(error)
            }
        }
    }
}
