package com.example.youngcarers.data.api.models


import com.google.gson.annotations.SerializedName

/**
 * @param description Description string
 * @param isPaidContent bool, true or false
 * @param keywords Keyword string
 * @param lastUpdated Timestamp of las update
 * @param title Title of the reference
 * @param url Url of the reference
 *
 * Represents a reference of an entry
 */

data class Reference(
    @SerializedName("description")
    val description: String,
    @SerializedName("isPaidContent")
    val isPaidContent: Boolean,
    @SerializedName("keywords")
    val keywords: List<String>,
    @SerializedName("lastUpdated")
    val lastUpdated: String,
    @SerializedName("previewImageUrl")
    val previewImageUrl: String,
    @SerializedName("title")
    val title: String,
    @SerializedName("url")
    val url: String
)