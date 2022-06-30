//
//  EmergencyPage.swift
//  Young Carers Austria
//
//  Created by Bernhard Mayr on 30.06.22.
//

import SwiftUI

struct EmergencyNumber {
    let name: String
    let number: String
}

struct EmergencyPage: View {
    var emergency: Emergency
    let numbers: [EmergencyNumber] = [
        EmergencyNumber(name: "Euro-Notruf", number: "112"),
        EmergencyNumber(name: "Feuerwehr", number: "122"),
        EmergencyNumber(name: "Polizei", number: "133"),
        EmergencyNumber(name: "Bergrettung", number: "140"),
        EmergencyNumber(name: "Ärztenotdienst", number: "141"),
        EmergencyNumber(name: "Telefonseelsorge", number: "142"),
        EmergencyNumber(name: "Rettung", number: "144"),
        EmergencyNumber(name: "Notrufdienst für Kinder und Jugendliche", number: "147")
    ]
    
    var body: some View {
        List {
            Section(header:
                        Text("Im Notfall muss es schnell gehen. Deshalb bietet dir diese Seite eine Übersicht über die relevanten Notrufnummern. Am besten auf Notfälle vorbereitet bist du allerdings, wenn du dich bereits im Vorherein darauf vorbereitest, deshalb haben wir hier für dich auch ein paar Informationen dazu gesammelt.")
                .font(.body)
                .listRowBackground(Color(.secondarySystemBackground))
                .padding([.vertical])
                .listRowInsets(EdgeInsets())
                .foregroundColor(Color.primary)
                .textCase(nil),
                    
                    footer: Link(destination: URL(string: "https://www.oesterreich.gv.at/themen/gesundheit_und_notfaelle/notrufnummern.html")!) {
                Text("Mehr Info zu den Notrufnummern findest du auf www.oesterreich.gv.at.")
                    .padding([.top], 1)
                    .frame(maxWidth: .infinity, alignment: .center)
                    .multilineTextAlignment(.center)
                
            }
            ) {
                ForEach(numbers, id: \.number) { entry in
                    Button(action: { callNumber(phoneNumber: entry.number) })
                    {
                        HStack {
                            Text(entry.name)
                            Spacer()
                            Text(entry.number)
                                .bold()
                        }
                    }
                }
            }
            
            Section(header:
                        Text("Schau mal rein...")
                .font(.body)
                .listRowBackground(Color(.secondarySystemBackground))
                .padding([.vertical])
                .listRowInsets(EdgeInsets())
                .foregroundColor(Color.primary)
                .textCase(nil))
            {
                Text(emergency.state)
            }
        }
        .listStyle(InsetGroupedListStyle())
        .navigationTitle("Im Notfall")
    }
    
    private func callNumber(phoneNumber: String) {
        guard let url = URL(string: "telprompt://\(phoneNumber)"),
            UIApplication.shared.canOpenURL(url) else {
            return
        }
        UIApplication.shared.open(url, options: [:], completionHandler: nil)
    }

}

struct EmergencyPage_Previews: PreviewProvider {
    static var previews: some View {
        EmergencyPage(emergency: previewContent.emergency)
    }
}
