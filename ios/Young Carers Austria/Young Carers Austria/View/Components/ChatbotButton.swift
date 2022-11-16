//
//  ChatbotButton.swift
//  Young Carers Austria
//
//  Created by Bernhard Mayr on 14.11.22.
//

import SwiftUI

struct ChatbotButton: View {
    var character: Character
    var action: () -> Void
    
    @State private var dragAmount: CGPoint?
    var body: some View {
        GeometryReader { gp in // just to center initial position
            ZStack(alignment: .bottomTrailing) {
                Button(action: action) {
                    Text(character.emoji)
                        .padding()
                        .font(.title)
                        .background(Color.accentColor)
                        .cornerRadius(.infinity)
                }
                .animation(.default.speed(10), value: dragAmount)
                .position(self.dragAmount ?? CGPoint(x: gp.size.width - 40, y: gp.size.height - 85))
                .highPriorityGesture(
                    DragGesture()
                        .onChanged { self.dragAmount = $0.location})
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity) // full space
        }
    }
}
