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
            VStack(alignment: .leading) {
                Text(category.title)
                    .font(.headline)
                    .fontWeight(.bold)
                    .padding([.bottom], 2)
                Markdown(category.information)
                    .font(.subheadline)
            }
            .listSectionSeparator(.hidden)
            .listRowSeparator(.hidden)
            .listRowInsets(EdgeInsets())
            .listRowBackground(Color(.secondarySystemBackground))
            .padding([.horizontal, .top])
            
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
                        .listRowBackground(Color(.secondarySystemBackground))
                        .listRowSeparator(.hidden)
                }
            }
            
        }
        .listRowInsets(EdgeInsets())
        .listStyle(.plain)
        .background(Color(.secondarySystemBackground))
        .navigationTitle(category.name)
    }
}


//struct CategoryView_Previews: PreviewProvider {
//    static var previews: some View {
//        CategoryView()
//    }
//}
