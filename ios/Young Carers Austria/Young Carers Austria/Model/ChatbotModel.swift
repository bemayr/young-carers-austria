//
//  Chatbot.swift
//  Young Carers Austria
//
//  Created by Bernhard Mayr on 14.11.22.
//

import Foundation

actor ChatbotModel {
    static var shared = ChatbotModel()
    
    private init() {}
    
    private func loadJson(fromURLString urlString: String,
                          completion: @escaping (Result<Data, Error>) -> Void) {
        if let url = URL(string: urlString) {
            let urlSession = URLSession(configuration: .default).dataTask(with: url) { (data, response, error) in
                if let error = error {
                    completion(.failure(error))
                }
                
                if let data = data {
                    completion(.success(data))
                }
            }
            urlSession.resume()
        }
    }
    
    func loadCharacter() async -> Character? {
        var request = URLRequest(url: URL(string: "https://chatbot.young-carers-austria.at/character")!)
        request.allHTTPHeaderFields = ["Accept": "application/json"]
        do {
            let (data, _) = try await URLSession.shared.data(for: request)
            return try JSONDecoder().decode(Character.self, from: data)
        }
        catch {
            return nil
        }
    }
    
    func loadWelcomeMessages() async -> [String] {
        var request = URLRequest(url: URL(string: "https://chatbot.young-carers-austria.at/welcome")!)
        request.allHTTPHeaderFields = ["Accept": "application/json"]
        do {
            let (data, _) = try await URLSession.shared.data(for: request)
            return try JSONDecoder().decode([String].self, from: data)
        }
        catch {
            return []
        }
    }
    
    func requestAnswer(message: String) async -> Response? {
        var answerURLComponents = URLComponents(string: "https://chatbot.young-carers-austria.at/answer")!
        answerURLComponents.queryItems = [
            URLQueryItem(name: "message", value: message)
        ]
        
        var request = URLRequest(url: answerURLComponents.url!)
        request.allHTTPHeaderFields = ["Accept": "application/json"]
        do {
            let (data, _) = try await URLSession.shared.data(for: request)
            return try! JSONDecoder().decode(Response.self, from: data)
        }
        catch {
            return nil
        }
    }
}


