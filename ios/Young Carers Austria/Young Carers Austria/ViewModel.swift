import Foundation

@MainActor
final class ViewModel: ObservableObject {
    @Published var content: Content? = nil
    
    func loadContent() async throws {
        if await (!Model.shared.hasBeenCached()) {
            let data = try await Model.shared.loadContentFromBundle()
            content = try await Model.shared.parseContent(data!)
        }
        else {
            let data = try await Model.shared.loadContentFromCache()
            do {
                content = try await Model.shared.parseContent(data!)
            }
            catch {
                print("parsing error")
                // intentionally do nothing
                // explanation: the parsing failed, which indicates that we introduced breaking data changes at the server, so just proceed to the next step and load new data from the server, the new content then gets cached automatically
            }
        }
        
        // refresh the data
        print("loading content")
        let data = try await Model.shared.loadContentFromNetwork()
        print("content loaded")
        content = try await Model.shared.parseContent(data)
        print("content parsed")
        try await Model.shared.cacheContent(content: data)
        print("content cached")
    }
}
