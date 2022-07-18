import SwiftUI

struct InsightsPage: View {
    var insights: [Insight]
    
    var body: some View {
        List {
            Section(header:
                        Text("Hier bist du auf der Startseite der Young Carers Austria App gelandet. Vielleicht hast du ja eine der folgenden Fragen, oder du erlebst auch gerade eine dieser Situationen?")
                .font(.body)
                .listRowBackground(Color(.secondarySystemBackground))
                .padding([.vertical])
                .listRowInsets(EdgeInsets())
                .foregroundColor(Color.primary)
                .textCase(nil)
            ) {
                ForEach(insights) { insight in
                    NavigationLink {
                        InsightDetailPage(insight: insight)
                    } label: {
                        Text(insight.question)
                            .padding([.vertical], 6)
                    }
                }
            }
        }
        .listStyle(InsetGroupedListStyle())
        .navigationTitle("Hallo!")
    }
}
