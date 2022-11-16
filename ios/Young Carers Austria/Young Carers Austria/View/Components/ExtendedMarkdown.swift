//
//  ExtendedMarkdown.swift
//  Young Carers Austria
//
//  Created by Bernhard Mayr on 10.11.22.
//

import SwiftUI

struct ExtendedMarkdown: View {
    var content: [Insight.Part]
    
    var body: some View {
        ForEach(content){ part in
            switch part {
            case .text(let markdown):
                Markdown(markdown)
                    .multilineTextAlignment(.leading)
            case .reference(let reference):
                ReferenceView.Entry(reference: reference)
                    .padding([.vertical])
            case .category(let category):
                NavigationLink {
                    CategoryDetailPage(category: category)
                } label: {
                    Text(category.name)
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color(.systemBackground))
                        .cornerRadius(12)
                        .padding([.vertical])
                }
            }
        }
    }
}
