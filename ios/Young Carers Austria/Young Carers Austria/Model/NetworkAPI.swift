//
//  NetworkAPI.swift
//  Young Carers Austria
//
//  Created by Bernhard Mayr on 30.06.22.
//

import Foundation

actor NetworkAPI {
    static let url = URL(string: "https://bemayr.github.io/young-carers-austria/api/content.json")
    
    static var shared = NetworkAPI()
    
    private init() {
        
    }
    
    func loadContent() async throws -> Content {
        // data request
        var request = URLRequest(url: NetworkAPI.url!)
        request.allHTTPHeaderFields = ["Accept": "application/json"]
        let (data, _) = try await URLSession.shared.data(for: request)
        
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
        let content = try! decoder.decode(Content.self, from: data)
        return content
    }
}
