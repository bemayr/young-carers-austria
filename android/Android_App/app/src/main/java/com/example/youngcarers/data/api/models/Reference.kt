package com.example.youngcarers.data.api.models


import com.google.gson.annotations.SerializedName

data class Reference(
    @SerializedName("description")
    val description: String,
    @SerializedName("isPaidContent")
    val isPaidContent: Boolean,
    @SerializedName("keywords")
    val keywords: List<String>,
    @SerializedName("lastUpdated")
    val lastUpdated: String,
    @SerializedName("title")
    val title: String,
    @SerializedName("url")
    val url: String
)