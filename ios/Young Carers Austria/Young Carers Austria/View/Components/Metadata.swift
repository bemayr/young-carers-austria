import SwiftUI

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
