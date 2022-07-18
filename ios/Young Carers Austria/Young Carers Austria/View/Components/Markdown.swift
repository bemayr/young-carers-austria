import SwiftUI

struct Markdown: View {
    var markdown: String
    
    init(_ markdown: String) {
        self.markdown = markdown
    }
    
    var body: some View {
        Text(try! AttributedString(
            markdown: markdown,
            options: AttributedString.MarkdownParsingOptions(interpretedSyntax: .inlineOnlyPreservingWhitespace)))
    }
}
