//
//  Young_Carers_AustriaApp.swift
//  Young Carers Austria
//
//  Created by Bernhard Mayr on 30.06.22.
//

import SwiftUI

@main
struct YoungCarersAustriaApp: App {
    @StateObject private var viewModel = ViewModel()
    
    init() {
        //Use this if NavigationBarTitle is with Large Font
        UINavigationBar.appearance().largeTitleTextAttributes = [.foregroundColor: UIColor(Color.accentColor)]

        //Use this if NavigationBarTitle is with displayMode = .inline
        UINavigationBar.appearance().titleTextAttributes = [.foregroundColor: UIColor(Color.accentColor)]
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(viewModel)
                .task {
                    let url = URL(string: "https://www.gesundheit.steiermark.at/cms/bilder/861513/80/150/100/df7e405d/CCM.jpg?as_is=J\n")
                    
                    print(url)
                    
                    try! await viewModel.loadContent() // intentionally fail here if this function throws
                }
        }
    }
}
