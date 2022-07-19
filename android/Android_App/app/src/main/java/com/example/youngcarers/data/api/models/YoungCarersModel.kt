package com.example.youngcarers.data.api.models


import com.google.gson.annotations.SerializedName

data class YoungCarersModel(
    @SerializedName("abc")
    val abc: List<Abc>,
    @SerializedName("emergency")
    val emergency: Emergency,
    @SerializedName("insights")
    val insights: List<Insight>,
    @SerializedName("metadata")
    val metadata: List<Metadata>,
    @SerializedName("timestamp")
    val timestamp: String
)