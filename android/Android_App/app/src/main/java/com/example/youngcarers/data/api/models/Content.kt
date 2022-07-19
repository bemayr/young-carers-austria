package com.example.youngcarers.data.api.models


import com.google.gson.annotations.SerializedName

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