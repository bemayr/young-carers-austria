import SwiftUI

struct CategoriesPage: View {
    var infos: Infos
    var categories: [Category]
    
    var body: some View {
        List {
            Section(header:
                        Text(infos.description)
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
        .navigationTitle(infos.title)
    }
}
