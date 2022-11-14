import Foundation

@MainActor
final class ViewModel: ObservableObject {
    @Published var content: Content? = nil
    
    func loadContent() async {
        if await (!Model.shared.hasBeenCached()) {
            // if the following operations fail, the app should fail, they always have to work because they are integrated into the build
            let data = try! await Model.shared.loadContentFromBundle()
            content = try! await Model.shared.parseContent(data)
        }
        else {
            do {
                let data = try await Model.shared.loadContentFromCache()
                content = try await Model.shared.parseContent(data!)
            }
            catch {
                // intentionally do nothing
                // explanation: the parsing failed, which indicates that we introduced breaking data changes at the server, so just proceed to the next step and load new data from the server, the new content then gets cached automatically
            }
        }
        
        // try to refresh the data
        do {
            let data = try await Model.shared.loadContentFromNetwork()
            content = try await Model.shared.parseContent(data)
            try await Model.shared.cacheContent(content: data)
        }
        catch {
            // intentionally do nothing, fall back to local data
        }
    }
}
