package com.example.youngcarers.data.api.models


import com.google.gson.annotations.SerializedName

data class Insight(
    @SerializedName("content")
    val content: List<Content>,
    @SerializedName("question")
    val question: String
)