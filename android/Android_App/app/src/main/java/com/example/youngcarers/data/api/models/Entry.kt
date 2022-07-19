package com.example.youngcarers.data.api.models


import com.google.gson.annotations.SerializedName

data class Entry(
    @SerializedName("ownerName")
    val ownerName: String,
    @SerializedName("ownerUrl")
    val ownerUrl: String,
    @SerializedName("references")
    val references: List<Reference>
)