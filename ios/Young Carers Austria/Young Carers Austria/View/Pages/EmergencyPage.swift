//
//  EmergencyPage.swift
//  Young Carers Austria
//
//  Created by Bernhard Mayr on 30.06.22.
//

import SwiftUI

struct EmergencyPage: View {
    var emergency: Emergency
    
    var body: some View {
//        Text(emergency.state)
//            .navigationTitle("Im Notfall")
        List {
            Section(header: Group {
//                VStack {
//                    HStack {
//                        Button(action: {
//
//                        }, label: {
//                            Text("Button")
//                        })
//                        .padding(5)
//                        .background(Color(red: 238/255, green: 238/255, blue: 239/255))
//                        .cornerRadius(5)
//                        .padding()
//
//                        Spacer()
//                    }
//                    Spacer()
//                }
                Text("some awesome text i wanted to write here, asldökfjlöasdhf aöhsföhaslödfhö lahsldfh ölkashjdf jkasdhfl kasdjhflkasdhflkjasdhflkajsdhf klashdf lkjahsdfkljjhas lkjdfhklasdhf lkashdfkljfahs lkajfsdhölasdjfäasljfla sjdf")
            }) {
                ForEach(0..<20) { i in
                    Text("Item \(i)")
                }
            }}
        .listStyle(.plain)
            .navigationTitle("Im Notfall")
    }
}

struct EmergencyPage_Previews: PreviewProvider {
    static var previews: some View {
        EmergencyPage(emergency: previewContent.emergency)
    }
}
