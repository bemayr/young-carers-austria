import SwiftUI

struct AboutPage: View {
    var metadata: [MetadataEntry]
    var contentTimestamp: Date
    
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
