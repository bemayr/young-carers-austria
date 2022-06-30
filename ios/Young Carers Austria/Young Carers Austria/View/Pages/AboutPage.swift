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
    
    var body: some View {
        Text("Letzte Datenaktualisierung: \(timeAgoDisplay(date: contentTimestamp))")
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
