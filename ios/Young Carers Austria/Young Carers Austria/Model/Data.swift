// This file was generated from JSON Schema using quicktype, do not modify it directly.

import Foundation

struct Content: Decodable {
    let faqs: [FAQ]
    let emergency: Emergency
    let help: Help
    let infos: Infos
    let insights: [Insight]
    let abc: [Category]
    let metadata: [MetadataEntry]
    let timestamp: Date
}

struct Insight: Decodable, Identifiable {
    var id: String {
        question
    }
    
    let question: String
    let parts: [Part]
    
    enum CodingKeys: String, CodingKey {
        case question
        case parts = "content"
    }
    
    enum Part: Decodable, Identifiable {
        var id: String {
            switch self {
            case .text(let content):
                return "text:\(content.hashValue)"
            case .reference(let reference):
                return "reference:\(reference.id)"
            case .category(let category):
                return "category:\(category.id)"
            }
        }
        
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
}

struct Category: Decodable, Identifiable {
    var id: String {
        name
    }
    
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


struct Reference: Decodable, Identifiable {
    var id: URL {
        url
    }
    
    let title: String
    let description: String
    let previewImageUrl: String // using String here deliberately, because if the URL is ill-formatted the Decoder simply crashes
    let url: URL
    let isPaidContent: Bool
    let lastUpdated: Date
}

struct ReferenceNew: Decodable, Identifiable {
    var id: URL {
        url
    }
    
    let title: String
    let description: String
    let previewImageUrl: String // using String here deliberately, because if the URL is ill-formatted the Decoder simply crashes
    let url: URL
    let containsPaidContent: Bool
}

struct Emergency: Decodable {
    let title: String
    let description: String
    let numbers: [Number]
    let content: [Insight.Part]
    
    struct Number: Codable, Identifiable {
        var id: String {
            number
        }
        
        let label: String
        let number: String
    }
}

struct FAQ: Decodable, Identifiable {
    var id: String {
        question
    }
    
    let question: String
    let answer: String
    let showOnLandingPage: Bool
}

struct Help: Decodable {
    let title: String
    let description: String
}

struct Infos: Decodable {
    let title: String
    let description: String
}

struct MetadataEntry: Decodable {
    let key, title, content: String
}

struct Character: Decodable {
    let emoji, name: String
}

enum Response: Decodable {
    case notFound(messages: [String])
    case found(messages: [String], results: [Result])
    
    enum Result: Decodable {
        case reference(id: String, reference: ReferenceNew)
        
        enum CodingKeys: String, CodingKey {
            case type, id, reference
        }
        
        init(from decoder: Decoder) throws {
            let container = try decoder.container(keyedBy: CodingKeys.self)
            let type = try container.decode(String.self, forKey: .type)
            switch type {
            case "reference":
                self = .reference(
                    id: try container.decode(String.self, forKey: .id),
                    reference: try container.decode(ReferenceNew.self, forKey: .reference))
                return
            default:
                throw DecodingError.dataCorruptedError(
                    forKey: CodingKeys.type,
                    in: container,
                    debugDescription: "Unexpected type, can't handle this")
            }
        }
    }
    
    enum CodingKeys: String, CodingKey {
        case type, messages, results
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let type = try container.decode(String.self, forKey: .type)
        switch type {
        case "no-result-found":
            self = .notFound(
                messages: try container.decode([String].self, forKey: .messages))
            return
        case "result-found":
            self = .found(
                messages: try container.decode([String].self, forKey: .messages),
                results: try container.decode([Result].self, forKey: .results))
            return
        default:
            throw DecodingError.dataCorruptedError(
                forKey: CodingKeys.type,
                in: container,
                debugDescription: "Unexpected type, can't handle this")
        }
    }
}
