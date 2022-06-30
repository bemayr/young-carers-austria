// This file was generated from JSON Schema using quicktype, do not modify it directly.
// To parse the JSON, add this file to your project and do:
//
//   let welcome = try? newJSONDecoder().decode(Welcome.self, from: jsonData)

import Foundation

struct Content: Decodable {
    let insights: [Insight]
    let abc: [Category]
    let emergency: Emergency
    let metadata: [MetadataEntry]
    let timestamp: Date
}

struct Insight: Decodable {
    let question: String
    let parts: [InsightPart]
    
    enum CodingKeys: String, CodingKey {
        case question
        case parts = "content"
    }
    
    enum Part: Decodable {
        case text(String)
        case reference(Reference)
        case category(Category)
        
        enum CodingKeys: String, CodingKey {
            case type, text, reference, category
        }
        
        init(from decoder: Decoder) throws {
            let container = try decoder.container(keyedBy: CodingKeys.self)
            let type = try container.decode(String.self, forKey: .type)
            switch type {
            case "text":
                self = .text(try container.decode(String.self, forKey: .text))
                return
            case "reference":
                self = .reference(try container.decode(Reference.self, forKey: .reference))
                return
            case "category":
                self = .category(try container.decode(Category.self, forKey: .category))
                return
            default:
                throw DecodingError.dataCorruptedError(
                    forKey: CodingKeys.type,
                    in: container,
                    debugDescription: "Unexpected type, can't handle this")
            }
        }
    }
    
    struct InsightPart: Decodable {
        let type: String
        let text: String?
        let reference: Reference?
        let category: Category?
    }
}

struct Category: Decodable {
    let name: String
    let title: String
    let information: String
    let entries: [Entry]
    
    struct Entry: Decodable {
        let ownerName: String
        let ownerURL: URL?
        let references: [Reference]

        enum CodingKeys: String, CodingKey {
            case ownerName
            case ownerURL = "ownerUrl"
            case references
        }
        
        init(from decoder: Decoder) throws {
            let decoder = try decoder.container(keyedBy: CodingKeys.self)
            ownerName = try decoder.decode(String.self, forKey: .ownerName)
            ownerURL = try? decoder.decode(URL?.self, forKey: .ownerURL)
            references = try decoder.decode([Reference].self, forKey: .references)
        }
    }
}


struct Reference: Decodable {
    let title: String
    let description: String
    let url: URL
    let isPaidContent: Bool
    let lastUpdated: Date
    let keywords: [String]
}

struct Emergency: Decodable {
    let state: String
}

struct MetadataEntry: Decodable {
    let key, title, content: String
}
