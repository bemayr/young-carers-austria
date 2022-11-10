import SwiftUI
import MarkdownUI

struct Markdown: View {
    var markdown: String
    
    init(_ markdown: String) {
        self.markdown = markdown
    }
    
    var body: some View {
        MarkdownUI.Markdown(
            markdown.replacingOccurrences(of: "(?<=.)\n(?=.)", with: "  \n", options: [.regularExpression]))
        .accentColor(.highlightColor)
    }
}
