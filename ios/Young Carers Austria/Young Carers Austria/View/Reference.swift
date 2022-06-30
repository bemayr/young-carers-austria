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

        var body: some View {
            Link(destination: reference.url) {
                ZStack {
//                    RoundedRectangle(cornerRadius: 10, style: .continuous)
//                                    .fill(.white)
                    GeometryReader { geometry in
                        VStack {
                        AsyncImage(url: URL(string: "https://www.uopeople.edu/wp-content/uploads/2020/04/ben-mullins-oXV3bzR7jxI-unsplash-1-scaled-e1586692935743.jpg")) { image in
                            image
                                .renderingMode(.original)
                                .resizable()
                                .aspectRatio(contentMode: .fill)
    //                            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .center)
                                .clipped()
//                                .contentShape(Rectangle())
                        } placeholder: {
                            ProgressView()
                        }
//                            Text(geometry.size.height.description)
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
                            Text(reference.description)
                                .font(.footnote)
                                .foregroundColor(.secondary)
                                .multilineTextAlignment(.leading)
                        }
                        .frame(maxWidth: .infinity, alignment: .bottomLeading)
                        .padding()
                        .background(.thinMaterial)
                    }
                }
                .cornerRadius(15, antialiased: true)
            }
        }
    }

}
