//
//  Reference.swift
//  Young Carers Austria
//
//  Created by Bernhard Mayr on 30.06.22.
//

import SwiftUI

struct ReferenceView {
    struct Row: View {
        var entry: Category.Entry

        var body: some View {
            GeometryReader { geometry in
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(alignment: .top, spacing: 15) {
                        ForEach(entry.references) { reference in
                            ReferenceView.Entry(reference: reference)
                                .frame(width: geometry.size.width * 0.85)
                        }
                    }
                }
            }
            .frame(height: 200)
        }
    }
    
    struct Entry: View {
        var reference: Reference
        
        @State private var presentingConfirmationDialog: Bool = false

        var body: some View {
            Link(destination: reference.url) {
                ZStack {
                    
                    // Really hacky, probably because of AsyncImage
                    GeometryReader { geometry in
                        VStack {
                            AsyncImage(url: URL(string: "https://www.uopeople.edu/wp-content/uploads/2020/04/ben-mullins-oXV3bzR7jxI-unsplash-1-scaled-e1586692935743.jpg")) { image in
                                image
                                    .renderingMode(.original)
                                    .resizable()
                                    .aspectRatio(contentMode: .fill)
                                    .clipped()
                                }
                            placeholder: {
                                ProgressView()
                            }
                        }
                    }
                    
                    VStack(alignment: .leading) {
                        Spacer()
                        VStack(alignment: .leading) {
                            Text(reference.title)
                                .font(.title3)
                                .fontWeight(.semibold)
                                .foregroundColor(.primary)
                                .multilineTextAlignment(.leading)
                                .padding([.bottom], 1)
                            Markdown(reference.description)
                                .font(.footnote)
                                .foregroundColor(.secondary)
                                .multilineTextAlignment(.leading)
                        }
                        .frame(maxWidth: .infinity, alignment: .bottomLeading)
                        .padding()
                        .background(.thinMaterial)
                    }
                    
                    if(reference.isPaidContent) {
                        ZStack{
                            Circle()
                                .fill(.thinMaterial)
                                .frame(width: 30, height: 30)
                            Text("💵")
                                .accessibilityLabel("Dieser Eintrag enthält bezahlbaren Inhalt")
                        }
                        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topTrailing)
                        .padding(6)
                    }
                }
                .cornerRadius(18, antialiased: true)
            }
            .confirmationDialog("Link wirklich öffnen", isPresented: $presentingConfirmationDialog) {
                Button("Link öffnen", role: .none, action: { openLink() })
                Button("Abbrechen", role: .cancel, action: { })
              } message: {
                  Text("Wir möchten dich darauf hinweisen, dass dieser Link bezahlbaren Inhalt beinhaltet. Möchtest du ihn wirklich öffnen?")
                }

            .environment(\.openURL, OpenURLAction { url in
                if(reference.isPaidContent) {
                    presentingConfirmationDialog.toggle()
                }
                else {
                    openLink()
                }
                return .handled
            })
        }
        
        private func openLink() {
            UIApplication.shared.open(reference.url)
        }
    }
}
