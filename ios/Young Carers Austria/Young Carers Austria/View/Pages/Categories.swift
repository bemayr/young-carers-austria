import SwiftUI

struct CategoriesPage: View {
    var categories: [Category]
    
    var body: some View {
        List {
            Section(header:
                        Text("Hier haben wir alle Informationen für dich gesammelt und alphabetisch sortiert. Schau einfach ein bisschen durch, frag den Chatbot oder probiere die Suche wenn du Infos zu einem speziellen Thema haben möchtest.")
                .font(.body)
                .listRowBackground(Color(.secondarySystemBackground))
                .padding([.vertical])
                .listRowInsets(EdgeInsets())
                .foregroundColor(Color(.label))
                .textCase(nil)
            ) {
                ForEach(categories) {category in
                    NavigationLink {
                        CategoryDetailPage(category: category)
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
