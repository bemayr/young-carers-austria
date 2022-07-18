import SwiftUI

struct InsightDetailPage: View {
    var insight: Insight
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading){
                Text(insight.question)
                    .font(.title)
                    .fontWeight(.bold)
                Spacer()
                ForEach(insight.parts){ part in
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
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding()
        }
        .navigationBarTitleDisplayMode(.inline)
        .background(Color(.secondarySystemBackground))
    }
}
