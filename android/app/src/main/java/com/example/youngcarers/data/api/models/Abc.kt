package com.example.youngcarers.data.api.models


import com.google.gson.annotations.SerializedName

data class Abc(
    @SerializedName("entries")
    val entries: List<Entry>,
    @SerializedName("information")
    val information: String,
    @SerializedName("name")
    val name: String,
    @SerializedName("title")
    val title: String
)