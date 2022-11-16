import SwiftUI

struct EmergencyPage: View {
    var emergency: Emergency
    
    var body: some View {
        List {
            Section(header: Text(emergency.description)
                .font(.body)
                .listRowBackground(Color(.secondarySystemBackground))
                .padding([.vertical])
                .listRowInsets(EdgeInsets())
                .foregroundColor(Color.primary)
                .textCase(nil),
                    footer: Link(destination: URL(string: "https://www.oesterreich.gv.at/themen/gesundheit_und_notfaelle/notrufnummern.html")!) {
                Text("Mehr Info zu den Notrufnummern findest du auf www.oesterreich.gv.at.")
                    .padding([.top], 1)
                    .frame(maxWidth: .infinity, alignment: .center)
                    .multilineTextAlignment(.center)
            }) {
                ForEach(emergency.numbers) { entry in
                    Button(action: { callNumber(phoneNumber: entry.number) })
                    {
                        HStack {
                            Text(entry.label)
                            Spacer()
                            Text(entry.number)
                                .bold()
                                .padding(.leading, 24)
                        }
                    }
                }
            }
            
            // todo: refactor this for reusability
            ForEach(emergency.content){ part in
                switch part {
                case .text(let markdown):
                    Markdown(markdown)
                        .multilineTextAlignment(.leading)
                case .reference(let reference):
                    ReferenceView.Entry(reference: reference)
                        .padding([.vertical])
                case .category(let category):
                    Text(category.name)
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color(.systemBackground))
                        .cornerRadius(12)
                        .padding([.vertical])
                        .background(
                            NavigationLink(
                                destination: CategoryDetailPage(category: category),
                                label: {})
                            .opacity(0))
                }
            }
            .listRowSeparator(.hidden)
            .listRowInsets(EdgeInsets())
            .listRowBackground(Color(.secondarySystemBackground))
            .listStyle(.plain)
        }
        .listStyle(InsetGroupedListStyle())
        .navigationTitle(emergency.title)
    }
    
    private func callNumber(phoneNumber: String) {
        guard let url = URL(string: "telprompt://\(phoneNumber)"),
              UIApplication.shared.canOpenURL(url) else {
            return
        }
        UIApplication.shared.open(url, options: [:], completionHandler: nil)
    }
}
