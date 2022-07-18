//
//  Reference.swift
//  Young Carers Austria
//
//  Created by Bernhard Mayr on 30.06.22.
//

import SwiftUI
import SDWebImageSwiftUI

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
    
    static let images = [
//        "https://www.uopeople.edu/wp-content/uploads/2020/04/ben-mullins-oXV3bzR7jxI-unsplash-1-scaled-e1586692935743.jpg",
//        "https://www.sozialministerium.at/dam/jcr:7f12a701-79ca-4764-8a5b-5fe6d2890bd9/Webbilder_YoungCarers-App_Bubble-closeup5.jpg",
//        "https://www.sozialministerium.at/dam/jcr:264d5198-d7e5-4106-950f-12a854e6b270/Webbilder_YoungCarers-App_Bubble-closeup9.jpg",
//        "https://www.sozialministerium.at/dam/jcr:3c0e6acd-b52b-48c7-baae-b1b97065c162/Webbilder_YoungCarers-App_Bubble-closeup10.jpg",
//        "https://www.gesundheit.gv.at/dam/jcr:3a7f4b85-a91d-4468-bd81-13c26d1f1861/Video_Entspannen_V3_328045292.jpeg",
        "https://www.gesundheit.gv.at/dam/jcr:b1d25c98-89c5-4062-99a6-bb74932b0ee1/notruf1.jpg",
        "https://www.harmony4kids.at/wp-content/uploads/2020/04/harmony4kids-training.jpg",
        "https://www.gesundheit.gv.at/dam/jcr:88ead326-91df-4fa9-b615-adf5ca365e39/logo-gesundheit%20(1).png",
        "https://anhoriga.se//static/images/logo.png",
        "https://open2chat.at/fileadmin/storage/_processed_/0/e/csm_AdobeStock_314958841_937dbbfab6.jpeg",
        "https://www.hobbylobby.co.at/wp-content/uploads/cropped-Favicon_Hobby_Lobby.png",
        "https://www.roteskreuz.at/typo3conf/ext/oerk_core/Resources/Public/Images/Defaults/default.jpg",
        "https://www.rataufdraht.at/getmedia/b7e4aeb5-3a82-46fe-be6c-39cb630df100/Tipps_Pflegst-du-jemanden_BrilliantEye_iStock.jpg?width=2000&height=1125&ext=.jpg",
        "https://image.jimcdn.com/app/cms/image/transf/none/path/sea09eeccbf437f7a/backgroundarea/i10fa52ac9813bc5e/version/1547046048/image.jpg",
        "https://scontent-frx5-1.xx.fbcdn.net/v/t31.18172-1/11034468_864799533582705_4278831193272846887_o.jpg?stp=c0.31.200.200a_dst-jpg_p200x200&_nc_cat=100&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=a_wVCtpd9-MAX8Jvvpc&_nc_ht=scontent-frx5-1.xx&oh=00_AT_-9CO3NbFprf7sMbPuP5ywooqK2Fxw80UxDRguO88zdw&oe=62E4644C",
        "https://www.alzheimer-selbsthilfe.at/wp-content/uploads/2017/07/merkimakidzlogo-web.png",
        "https://images.elternseite.at/NHnqQYIZx2dX_nTro8C1n3-Xt9o=/797x342:7089x3881/800x0/filters:quality(90)/https://cdn.elternseite.at/uploads/production//5f7189b809508d3337d7a0ad/relationship-parent-teenager-hugging-smiling-mother-daughter.jpg",
        "https://i.ytimg.com/vi/kdvd-R2b6YA/hqdefault.jpg",
        "https://i.ytimg.com/vi/ynn_Z7Qy-_o/maxresdefault.jpg",
        "https://i.ytimg.com/vi/AVV1eMiK91A/maxresdefault.jpg",
        
    ]
    
    struct Entry: View {
        var reference: Reference
        
        @State private var presentingConfirmationDialog: Bool = false

        var body: some View {
            Link(destination: reference.url) {
                ZStack {
                    
                    // Really hacky, probably because of AsyncImage
                    GeometryReader { geometry in
                        VStack {
                            
//                            AsyncImage(url: URL(string: images.randomElement()!)) { image in
//                                image
//                                    .renderingMode(.original)
//                                    .resizable()
//                                    .aspectRatio(contentMode: .fill)
//                                    .frame(width: geometry.size.width, height: geometry.size.height, alignment: .center)
//                                    .clipped()
//                                }
//                            placeholder: {
//                                ProgressView()
//                            }
                            
                            WebImage(url: URL(string: reference.previewImageUrl)) // using this because the JSON Decoder struggles with Whitespaces in URLs
                                .resizable() // Resizable like SwiftUI.Image, you must use this modifier or the view will use the image bitmap size
                                // Supports ViewBuilder as well
                                .placeholder {
                                    Rectangle()
//                                        .foregroundColor(.gray)
                                        .background(.thinMaterial)
                                }
                                .indicator(.activity) // Activity Indicator
                                .transition(.fade(duration: 0.5)) // Fade Transition with duration
                                .scaledToFill()
                                .frame(width: geometry.size.width, height: geometry.size.height, alignment: .center)
//                                .rotation3DEffect(.degrees(180), axis: (x: 1, y: 0, z: 0))
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
