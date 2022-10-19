package com.example.youngcarers.data.api.models


import com.google.gson.annotations.SerializedName

data class Emergency(
    @SerializedName("state")
    val state: String
)