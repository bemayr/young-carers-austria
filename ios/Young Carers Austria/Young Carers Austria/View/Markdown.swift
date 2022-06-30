//
//  Markdown.swift
//  Young Carers Austria
//
//  Created by Bernhard Mayr on 30.06.22.
//

import SwiftUI

struct Markdown: View {
    var markdown: String
    
    init(_ markdown: String) {
        self.markdown = markdown
    }
    
    var body: some View {
        Text(try! AttributedString(markdown: markdown, options: AttributedString.MarkdownParsingOptions(interpretedSyntax: .inlineOnlyPreservingWhitespace)))
    }
}

struct Markdown_Previews: PreviewProvider {
    static var previews: some View {
        Markdown("*test* **test** test \n\n test")
    }
}
