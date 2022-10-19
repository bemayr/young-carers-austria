package com.example.youngcarers.data.api.models


import com.google.gson.annotations.SerializedName

/**
 * @param entries List of all entries in the category list
 * @param information Information text of the entry
 * @param name Name of the entry
 * @param title Title of the entry
 *
 * Represents an entry in category
 */

data class Category(
    @SerializedName("entries")
    val entries: List<Entry>,
    @SerializedName("information")
    val information: String,
    @SerializedName("name")
    val name: String,
    @SerializedName("title")
    val title: String
)