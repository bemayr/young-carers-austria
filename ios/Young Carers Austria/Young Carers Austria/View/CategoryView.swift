//
//  Category.swift
//  Young Carers Austria
//
//  Created by Bernhard Mayr on 30.06.22.
//

import SwiftUI

struct CategoryView: View {
    var category: Category
    
    var body: some View {
        List {
            Section {
                Markdown(category.information)
                    .font(.subheadline)
                    .listRowBackground(Color(.secondarySystemBackground))
            }
//            .listRowSeparator(.hidden)
            .listSectionSeparator(.hidden)
            
            ForEach(category.entries, id: \.ownerName) { entry in
                Section(header: HStack {
                    Text(entry.ownerName)
                    Spacer()
                    if let ownerURL = entry.ownerURL {
                        Link(destination: ownerURL) {
                            Image(systemName: "globe")
                        }
                        .font(.subheadline)
                    }
                }) {
                    ReferenceView.Row(entry: entry)
                        .background(.teal)
                }
            }
            
        }
        .listRowInsets(EdgeInsets())
        .listStyle(.plain)
        .background(Color(.secondarySystemBackground))
        .navigationTitle(category.title)
    }
}


//struct CategoryView_Previews: PreviewProvider {
//    static var previews: some View {
//        CategoryView()
//    }
//}
