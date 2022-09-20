import Foundation

actor Model {
    static var shared = Model()
    
    private init() {}
    
    func loadContentFromNetwork() async throws -> Data {
        print("loadContentFromNetwork")
        var request = URLRequest(url: URL(string: "https://www.young-carers-austria.at/api/content.json")!)
        request.allHTTPHeaderFields = ["Accept": "application/json"]
        let (data, _) = try await URLSession.shared.data(for: request)
        return data
    }
    
    func loadContentFromBundle() throws -> Data? {
        print("loadContentFromBundle")
        return try loadContentFromURL(Bundle.main.url(forResource: "content", withExtension: "json"))
    }
    
    func loadContentFromCache() throws -> Data? {
        print("loadContentFromCache")
        return try loadContentFromURL(FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first?.appendingPathComponent("content.json"))
    }
    
    func cacheContent(content: Data) throws {
        print("cacheContent")
        if let url = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first?.appendingPathComponent("content.json") {
            try content.write(to: url, options: .atomic)
        }
    }
    
    func hasBeenCached() -> Bool {
        print("hasBeenCached")
        if let url = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first?.appendingPathComponent("content.json") {
            return FileManager.default.fileExists(atPath: url.path)
        }
        return false
    }
    
    func parseContent(_ content: Data) throws -> Content {
        // date formatter
        let formatter = DateFormatter()
        formatter.calendar = Calendar(identifier: .iso8601)
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.timeZone = TimeZone(secondsFromGMT: 0)
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXXXX"
        
        // json decoder
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .formatted(formatter)
        
        // decode and return
        return try decoder.decode(Content.self, from: content)
    }
    
    private func loadContentFromURL(_ url: URL?) throws -> Data? {
        guard let url = url else {
            return nil
        }
        guard let content = try? String(contentsOf: url) else {
            return nil
        }
        return Data(content.utf8)
    }
}
