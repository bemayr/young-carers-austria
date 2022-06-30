//
//  Alphabet.swift
//  Young Carers Austria
//
//  Created by Bernhard Mayr on 30.06.22.
//

import SwiftUI

struct AlphabetPage: View {
    var categories: [Category]
    
    var body: some View {
        List {
            Section {
                Text("Hier haben wir alle Informationen für dich gesammelt und alphabetisch sortiert. Schau einfach ein bisschen durch, frag den Chatbot oder probiere die Suche wenn du Infos zu einem speziellen Thema haben möchtest.")
                .font(.subheadline)
                .listRowBackground(Color(.secondarySystemBackground))
            }
            Section{
                ForEach(categories) {category in
                    NavigationLink {
                        CategoryView(category: category)
                    } label: {
                        Text(category.name)
                    }
                }
            }
        }
        .listStyle(InsetGroupedListStyle())
        .navigationTitle("Young Carers ABC")
    }
}

struct Alphabet_Previews: PreviewProvider {
    static var previews: some View {
        AlphabetPage(categories: previewContent.abc)
    }
}
