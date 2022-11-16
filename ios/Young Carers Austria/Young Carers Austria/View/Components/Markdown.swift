import SwiftUI
import MarkdownUI

struct Markdown: View {
    var markdown: String
    
    init(_ markdown: String) {
        self.markdown = markdown
    }
    
    var body: some View {
        MarkdownUI.Markdown(markdown)
            .accentColor(.highlightColor)
    }
}
