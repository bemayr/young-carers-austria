//
//  BotResponse.swift
//  youngCarers
//
//  Created by Christoph Bachl on 23.06.22.
//

import Foundation

let questionAnswerer = MyQuestionAnswerer()

func getBotResponse(message: String) -> String {
    let tempMessage = message.lowercased()
    
    /*if tempMessage.contains("hello") {
        return "Hey there!"
    } else if tempMessage.contains("goodbye") {
        return "Talk to you later!"
    } else if tempMessage.contains("how are you") {
        return "I'm fine, how about you?"
    } else {
        return "That's cool."
    }*/
    let answer = questionAnswerer.responseTo(question: message)

    return answer
   
}

