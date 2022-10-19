package com.example.youngcarers.data.api.models


import com.google.gson.annotations.SerializedName

/**
 * @param category type category with category information (name, title, information, entries)
 * @param reference type reference with reference information (url, title, description, image)
 * @param text type text with string information
 * @param type defines the type
 *
 * Represents the content in the insights list
 */

data class Content(
    @SerializedName("category")
    val category: Category,
    @SerializedName("reference")
    val reference: Reference,
    @SerializedName("text")
    val text: String,
    @SerializedName("type")
    val type: String
)