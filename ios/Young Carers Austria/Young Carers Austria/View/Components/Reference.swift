import SwiftUI
import SDWebImageSwiftUI

struct ReferenceView {
    struct Row: View {
        var entry: Category.Entry
        
        var body: some View {
            VStack(spacing: 16) {
                ForEach(entry.references) { reference in
                    ReferenceView.Entry(reference: reference)
                }
            }
        }
    }
    
    struct Entry: View {
        var reference: Reference
        
        @State private var presentingConfirmationDialog: Bool = false
        
        var body: some View {
            Link(destination: reference.url) {
                ZStack {
                    VStack(alignment: .leading, spacing: 0) {
                        WebImage(url: URL(string: reference.previewImageUrl))
                            .resizable()
                            .placeholder {
                                Rectangle().background(.thinMaterial)
                            }
                            .indicator(.activity)
                            .transition(.fade(duration: 0.5))
                            .aspectRatio(contentMode: .fit)
                        
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
                        .background(.background)
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
