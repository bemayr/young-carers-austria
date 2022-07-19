package com.example.youngcarers.data.api.models


import com.google.gson.annotations.SerializedName

data class Metadata(
    @SerializedName("content")
    val content: String,
    @SerializedName("key")
    val key: String,
    @SerializedName("title")
    val title: String
)