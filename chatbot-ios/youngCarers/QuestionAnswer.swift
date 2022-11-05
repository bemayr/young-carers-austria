//
//  QuestionAnswer.swift
//  youngCarers
//
//  Created by Christoph Bachl on 23.06.22.
//

import Foundation
import UIKit
import SwiftUI




let keywords = [
    
    
    
    
   "24 STUNDEN BETREUUNG",
   "24-STUNDEN-BETREUUNG",
   "PFLEGE",
   "BETREUUNG",
   "GESUNDHEIT",
   "MINISTERIUM",
   "YOUNG CARERS",
   "ALLGEMEINES",
   "ANGEHÖRIGENGESPRÄCH",
   "BERATUNG UND PFLEGETIPPS",
   "CHATTEN",
   "BERATUNG",
   "COVID 19",
   "CORONAVIRUS",
   "DEMENZ",
   "DIENSTLEISTUNGEN",
   "DIENSTE",
   "ENTSPANNUNGSTIPPS",
   "ERFAHRUNGSBERICHTE",
   "ERSTE HILFE",
   "HILFE",
   "FAMILIE",
   "FINANZIELLES",
   "FREIZEITANGEBOT",
   "GESUNDHEITSPORTAL",
   "INFO",
   "INFOSERVICE",
   "SPITAL",
   "KRANKENHAUS",
   "NOTFALL",
   "PFLEGEGELD",
   "RECHT",
   "SCHULE",
   "GELD",
   "SELBSTHILFEGRUPPE",
   "NEXT"
]

let conjugations = [
    " SIND " : " BIN ",
    " WAREN " : " WAR ",
    "ICH" : "DU",
    "IHR" : "MEIN",
    " ICH HABE " : " DU HAST ",
    " ICH BIN " : " DU BIST ",
    " DU " : " ICH ",
    "DU WÜRDEST" : "ICH WÜRDE",
    " DU HAST " : " ICH HABE ",
    " DU WIRST " : " ICH WERDE ",
    " IHR " : " MEIN ",
]


let replies = [
    
    "Zum Thema 24-Stunden-Betreuung kann ich dir diese Seite empfehlen: ",
    "Zum Thema 24-Stunden-Betreuung kann ich dir diese Seite empfehlen: ",
    "Zum Thema Pflege findest du alles hier: ",
    "Zum Thema Betreuung findest du alles hier: ",
    "Du willst etwas über Gesundheit wissen, dann schau hier mal rein: ",
    "",
    "Young Carers sind Kinder und Jugendliche unter 18 Jahren. Sie pflegen regelmäßig ein anderes Familienmitglied (z. B. Eltern, Großeltern oder Geschwister) die eine körperliche oder psychische Erkrankung haben. Young Carers leisten sehr viel Arbeit. Sie kochen, putzen, helfen ihren (gesunden) Geschwistern oft bis zu fünf Stunden täglich. Manchmal arbeiten sie auch in der direkten Pflege der Angehörigen mit. Eine Unterstützung von außen, z.B. durch Freunde oder eine Pflegeperson, haben sie nur selten. Laut einer österreichischen Studie aus 2012 gibt es rund 42.700 pflegende Kinder und Jugendliche im Alter bis 18 Jahren. Im Durchschnitt sind Young Carers 12,5 Jahre alt und 70% sind Mädchen. Als Kind oder Jugendlicher so eine pflegerische Verantwortung zu übernehmen ist eine sehr große Herausforderung! Mehr zu diesem Thema gibt es hier: ",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "Tut mir leid, das habe ich jetzt nicht verstanden. 😔\nMeine künstliche Intelligenz lernt stätig weiter."
   
    
]

/* This table lists the possible replies for each keyword. Each 3-element array
 [a, b, c] consists of: a) the current index in replies array, b) start index
 in the replies array, c) the number of replies for each keyword. */
var replyLookup = [
    [ 0, 0, 1, ],      // keyword 0 has replies 0, 1, and 2
    [ 1, 1, 1, ],      // keyword 1 has replies 3 and 4replyLookup    [[Int]]    52 values
    [ 2, 2, 1, ],      // keyword 2 has replies 5, 6, 7, and 8
    [ 3, 3, 1, ],      // 9,10,11,12
    [ 4, 4, 1, ],       // 13,14,15,16
    [ 5, 5, 1, ],     //17,18,19
    [ 6, 6, 1, ],     //20,21,22
    [ 7, 7, 1, ],     //23,24
    [ 8, 8, 1, ],     //25,26,27
    [ 9, 9, 1, ],     //28,29,30
    [ 10, 10, 1, ],     //31,32,33
    [ 11, 11, 1, ],     //35,35,36,37
    [ 12, 12, 1, ],     //39,39,40
    [ 13, 13, 1, ],     //42-45
    [ 14, 14, 1, ],      //47-54
    [ 15, 15, 1, ],     //56-63
    [ 16, 16, 1, ],     //65-72
    [ 17, 17, 1, ],     //74-81
    [ 18, 18, 1, ],     //83-91
    [ 19, 19, 1, ],     //92-101
    [ 20, 20, 1, ],     //101
    [ 21, 21, 1, ],     //103
    [ 22, 22 ,1, ],     //107
    [ 23, 23, 1, ],     //111
    [ 24, 24, 1, ],     //115
    [ 25, 25, 1, ],     //116
    [ 26, 26, 1, ],     //117
    [ 27, 27, 1, ],      //122
    [ 28, 28, 1, ],     //127
    [ 29, 29, 1, ],     //129
    [ 23, 30, 1, ],     //133
    [ 31, 31, 1, ],     //136
    [ 32, 32, 1, ],     //143
    [ 33, 33, 1, ],     //146
    [ 34, 34, 1, ],     //152
    [ 35, 35, 1, ], // NOKEYFOUND //159-164
    [ -1, -1, -1, ],  // SHUT
    [ 58, 58, 4,],
    [ 58, 58, 4,],
    [ 58, 58, 4,],
    [ 58, 58, 4,],
    [ 58, 58, 4,],
    [ 92, 92, 6,],
    [ 92, 92, 6,],
    [ 92, 92, 6,],
    [ 92, 92, 6,],
    [ 92, 92, 6,],
    [ 98, 98, 7,],
    [ 98, 98, 7,],
    [ 98, 98, 7,],
    [ 98, 98, 7,],
    [ 98, 98, 7,],
]

func findKeyword(in input: String) -> (index: Int, range: Range<String.Index>)? {
    for (index, keyword) in keywords.enumerated() {
        if let range = input.range(of: keyword) {
            return (index, range)
        }
    }
    return nil
}

extension String {
    func conjugated() -> String {
        // Add spaces around the text so we can match with the conjugations.
        var result = " \(self) "
        
        // Swap "ARE" for "AM" and "AM" for "ARE", and so on.
        for (conj1, conj2) in conjugations {
            print("conj1 is \(conj1) and conj2 is \(conj2)")
            if result.range(of: conj1) != nil {
                result = result.replacingOccurrences(of: conj1, with: conj2)
            } else {  // try swapping the other way around
                result = result.replacingOccurrences(of: conj2, with: conj1)
            }
        }
        print("the result is \(result)")
        return result
    }
}

func nextReply(for index: Int) -> String {
    print("index is \(index)")
    let reply = replies[replyLookup[index][0]]
    
    // Move the reply index ahead, and wrap around when we get to the end.
    replyLookup[index][0] += 1
    if replyLookup[index][0] == replyLookup[index][1] + replyLookup[index][2] {
        replyLookup[index][0] = replyLookup[index][1]
    }
    print("the reply is \(reply)")
    return reply
}

var lastLine = ""
var shouldQuit = false

func parse(_ text: String) -> String {
    // Convert to uppercase and add spaces in order to match keywords.
    let input = " \(text.uppercased()) "
    
    // This chatbot is a bit of a jerk...
    if input == lastLine {
        return "Diese Frage hatten wir schon! Frage mich doch etwas anderes."
    }
    lastLine = input
    
    var remainder = ""
    var k = 35          // nothing found
    // Find keyword in the input.
    print("the input is \(input)")
    if let (index, range) = findKeyword(in: input) {
        
        if index == 36 {     // SHUT
            shouldQuit = true
            return "O.K."
        }
        if index == 35 {//No word
            let newQuestion = [
                "Kann ich dir sonst noch weiter helfen? Lass es mich wissen. 😃",
                "Wenn du noch weitere Fragen hast, frag mich einfach. 😃",
                "Chill mal",
                "Marc"
            ]
            return newQuestion[Int.random(in: 0...1)]
        }
        
        // Take the remainder of the input string after the keyword and
        // convert "I AM" to "YOU ARE", and so on.
        remainder = String(input[range.upperBound...])
            .conjugated()
            .trimmingCharacters(in: .whitespaces)
            .replacingOccurrences(of: "!", with: "")
        print("the remainder is \(remainder)")
        k = index
    }
    
    // Use the keyword index to get a reply.
    let reply = nextReply(for: k)
    
    // This reply does not have a placeholder so return it verbatim.
    if !reply.hasSuffix("*") {
        return reply
    }
    
    // The reply has a placeholder but we have nothing to fill into it.
    if remainder.isEmpty{
        return "Kann ich dir sonst noch weiter helfen? Lass es mich wissen. 😃"
    }
    
    return reply.replacingOccurrences(of: "*", with: " " + remainder)
}

func listen(answer: String?) -> String {
    if let text = answer {
        return text.trimmingCharacters(in: .whitespaces)
    } else {
        return "OK"  // EOF (Ctrl-D)
    }
}

struct MyQuestionAnswerer {
    func responseTo(question: String) -> String {
        
        var response: String = ""
        let input = listen(answer: question)
        if !input.isEmpty {
            response = parse(input)
            if shouldQuit {
                //delay exiting the program
                DispatchQueue.main.asyncAfter(deadline: .now() + 3.0) {
                    exit(0) }
            }
        }
        return String(response)
    }
}

