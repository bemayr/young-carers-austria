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
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(viewModel)
        }
    }
}
