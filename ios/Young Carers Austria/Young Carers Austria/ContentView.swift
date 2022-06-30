//
//  ContentView.swift
//  Young Carers Austria
//
//  Created by Bernhard Mayr on 30.06.22.
//

import SwiftUI

struct ContentView: View {
    @EnvironmentObject var viewModel: ViewModel

    var body: some View {
        NavigationView {
            VStack {
                Text(viewModel.content?.timestamp.formatted() ?? "not initialized")
                    .padding()
                if let content = viewModel.content {
                    
                    List {
                        ForEach(content.insights, id:\.question) { insight in
                            Text(insight.question)
                        }
                    }
                    
                    List {
                        ForEach(content.abc, id:\.name) { category in
                            Text(category.name)
                        }
                    }
                }
                    
            }
        }
        .onAppear() {
            viewModel.loadContent()
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
