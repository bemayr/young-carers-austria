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
                ExtendedMarkdown(content: insight.parts)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding()
        }
        .navigationBarTitleDisplayMode(.inline)
        .background(Color(.secondarySystemBackground))
    }
}
