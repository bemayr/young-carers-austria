import SwiftUI

struct Answer {
    var answer: String
    let children: [String]? = nil
}

struct FAQView: View {
    var question: String
    var answer: String
    @State private var showContent = false

    var body: some View {
        DisclosureGroup(question, isExpanded: $showContent) {
            Markdown(answer)
                .padding([.vertical], 6)
                .listStyle(.plain)
        }
        .padding([.vertical], 6)
    }
}


struct InsightsPage: View {
    var help: Help
    var insights: [Insight]
    var faqs: [FAQ]
    var refreshContent: () async -> Void
    
    var body: some View {
        List {
            Section(header:
                        Text(help.description)
                .font(.body)
                .listRowBackground(Color(.secondarySystemBackground))
                .padding([.top])
                .listRowInsets(EdgeInsets())
                .foregroundColor(Color.primary)
                .textCase(nil)
            ) {}
            
            Section(header: Text("Situationen")) {
                ForEach(insights) { insight in
                    NavigationLink {
                        InsightDetailPage(insight: insight)
                    } label: {
                        Text(insight.question)
                            .padding([.vertical], 6)
                    }
                }
            }
            
            Section(header: Text("Häufig gestellte Fragen")) {
                ForEach(faqs) { faq in
                    FAQView(question: faq.question, answer: faq.answer)
//                    Section(header: Text(faq.question)) {
//                        let answer = [Answer(answer: faq.answer)]
//                        OutlineGroup(
//                            answer,
//                            id: \.answer,
//                            children: \.children
//                        ) { tree in
//                            Markdown(tree)
//                                .font(.subheadline)
//                        }
//                    }
                }
            }
        }
        .listStyle(InsetGroupedListStyle())
        .navigationTitle(help.title)
        .refreshable { await refreshContent() }
    }
}
