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
                    HStack(alignment: .top, spacing: 0) {
                        ForEach(entry.references) { reference in
                            ReferenceView.Entry(reference: reference)
                                .frame(width: geometry.size.width * 0.85)
                                .background(.yellow)
                        }
                    }
                }
                .background(.green)
            }
            .frame(height: 185)
        }
    }
    
    struct Entry: View {
        var reference: Reference

        var body: some View {
            Link(destination: reference.url) {
//                VStack(alignment: .leading) {
//                    AsyncImage(url: URL(string: "https://www.uopeople.edu/wp-content/uploads/2020/04/ben-mullins-oXV3bzR7jxI-unsplash-1-scaled-e1586692935743.jpg")) { image in
//                        image
//                            .resizable()
//                            .frame(width: 155, height: 155)
//                            .cornerRadius(5)
//                    } placeholder: {
//                        ProgressView()
//                    }
//                    Text(reference.title)
//                        .font(.caption)
//                    Text(reference.description)
//                        .font(.footnote)
//                }
                VStack {
                    AsyncImage(url: URL(string: "https://www.uopeople.edu/wp-content/uploads/2020/04/ben-mullins-oXV3bzR7jxI-unsplash-1-scaled-e1586692935743.jpg")) { image in
                        image
                            .resizable()
                            .renderingMode(.original)
                            .cornerRadius(5)
                            .aspectRatio(contentMode: .fit)
                    } placeholder: {
                        ProgressView()
                    }
                    HStack {
                        VStack(alignment: .leading) {
//                            Text(reference.keywords.map { $0.uppercased() }.joined(separator: ", "))
//                                .font(.headline)
//                                .foregroundColor(.secondary)
                            Text(reference.title)
                                .font(.title2)
                                .fontWeight(.semibold)
                                .foregroundColor(.primary)
                            Text(reference.description)
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                        }
                        .layoutPriority(100)

                        Spacer()
                    }
                }
                .cornerRadius(10)
                .overlay(
                    RoundedRectangle(cornerRadius: 10)
                        .stroke(Color(.sRGB, red: 150/255, green: 150/255, blue: 150/255, opacity: 0.1), lineWidth: 1)
                )
                .padding([.top, .horizontal])
            }
        }
    }

}
