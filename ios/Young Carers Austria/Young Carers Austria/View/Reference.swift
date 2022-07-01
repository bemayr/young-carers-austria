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
            .frame(height: 250)
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
                            let images = [
                                "https://www.uopeople.edu/wp-content/uploads/2020/04/ben-mullins-oXV3bzR7jxI-unsplash-1-scaled-e1586692935743.jpg",
                                "https://www.sozialministerium.at/dam/jcr:7f12a701-79ca-4764-8a5b-5fe6d2890bd9/Webbilder_YoungCarers-App_Bubble-closeup5.jpg",
                                "https://www.sozialministerium.at/dam/jcr:264d5198-d7e5-4106-950f-12a854e6b270/Webbilder_YoungCarers-App_Bubble-closeup9.jpg",
                                "https://www.sozialministerium.at/dam/jcr:3c0e6acd-b52b-48c7-baae-b1b97065c162/Webbilder_YoungCarers-App_Bubble-closeup10.jpg",
                                "https://www.gesundheit.gv.at/dam/jcr:3a7f4b85-a91d-4468-bd81-13c26d1f1861/Video_Entspannen_V3_328045292.jpeg",
                                "https://www.gesundheit.gv.at/dam/jcr:b1d25c98-89c5-4062-99a6-bb74932b0ee1/notruf1.jpg",
                                "https://www.harmony4kids.at/wp-content/uploads/2020/04/harmony4kids-training.jpg"]
                            
                            AsyncImage(url: URL(string: images.randomElement()!)) { image in
                                image
                                    .renderingMode(.original)
                                    .resizable()
                                    .aspectRatio(contentMode: .fill)
                                    .frame(width: geometry.size.width, height: geometry.size.height, alignment: .center)
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
                                .fill(.thickMaterial)
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
