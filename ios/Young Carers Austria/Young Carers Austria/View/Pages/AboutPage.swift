//
//  About.swift
//  Young Carers Austria
//
//  Created by Bernhard Mayr on 30.06.22.
//

import SwiftUI

struct AboutPage: View {
    var metadata: [MetadataEntry]
    var contentTimestamp: Date
    
    struct MetadaView : View {
        var metadata: MetadataEntry?
        
        init(_ metadata: MetadataEntry?) {
            self.metadata = metadata
        }
        
        var body: some View {
            if let metadata = metadata {
                Text(metadata.title)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .font(.title2)
                    .padding([.bottom], 1)
                    .padding([.top], 6)
                Markdown(metadata.content)
                    .font(.body)
                    .multilineTextAlignment(.leading)
                    .frame(maxWidth: .infinity, alignment: .leading)
            }
        }
    }
    
    var body: some View {
        let imprint = metadata.first { $0.key == "imprint" }
        let copyright = metadata.first { $0.key == "copyright" }
        let gdpr = metadata.first { $0.key == "gdpr" }
        let accessibility = metadata.first { $0.key == "accessibility" }
        
        ScrollView {
            MetadaView(imprint)
                .padding([.top])

            Image("bmsgpk")
                .resizable()
                .scaledToFit()
                .frame(height: 90)
            HStack {
                Image("pflegende_angehoerige")
                    .resizable()
                    .scaledToFit()
                    .frame(height: 110)
                Image("fhooe")
                    .resizable()
                    .scaledToFit()
                    .frame(height: 80)
            }
            
            Text("Letzte Datenaktualisierung: \(timeAgoDisplay(date: contentTimestamp))")
                .italic()
                .padding([.top])
            
            MetadaView(copyright)
            MetadaView(gdpr)
            MetadaView(accessibility)
        }
        .navigationTitle("Über die App")
        .padding([.horizontal])
        .background(Color(.secondarySystemBackground))
    }
}

func timeAgoDisplay(date: Date) -> String {
    let formatter = RelativeDateTimeFormatter()
    formatter.unitsStyle = .short
    return formatter.localizedString(for: date, relativeTo: Date())
}

struct About_Previews: PreviewProvider {
    static var previews: some View {
        AboutPage(metadata: previewContent.metadata, contentTimestamp: previewContent.timestamp)
    }
}
