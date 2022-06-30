import SwiftUI

struct InsightsPage: View {
    var insights: [Insight]

    var body: some View {
        List {
            Section(header:
                        Text("Hier bist du auf der Startseite der Young Carers Austria App gelandet. Vielleicht hast du ja eine der folgenden Fragen, oder du erlebst auch gerade eine dieser Situationen?")
                .font(.body)
                .listRowBackground(Color(.secondarySystemBackground))
                .padding([.top])
            ) {}
            .listRowInsets(EdgeInsets())
            .foregroundColor(Color.primary)
            .textCase(nil)
            
            Section{
                ForEach(insights) { insight in
                    NavigationLink {
                        InsightsDetailPage(insight: insight)
                    } label: {
                        Text(insight.question)
                    }
                }
            }
            .listStyle(InsetGroupedListStyle())
        .navigationTitle("Hallo!")
        }
    }
}

struct InsightsDetailPage: View {
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
                            .frame(height: 200, alignment: .center)
                            .padding([.vertical])
                    case .category(let category):
                        NavigationLink {
                            CategoryView(category: category)
                        } label: {
                            Text(category.name)
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



struct InsightsPage_Previews: PreviewProvider {
    static var previews: some View {
        InsightsPage(insights: previewContent.insights)
    }
}
