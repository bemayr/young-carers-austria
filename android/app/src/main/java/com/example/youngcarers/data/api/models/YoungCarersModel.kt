package com.example.youngcarers.data.api.models


import com.google.gson.annotations.SerializedName

/**
 * @param abc List of abc
 * @param emergency List of emergency
 * @param insights List of insights
 * @param metadata List of metadata
 * @param timestamp Timestamp of last update
 *
 * Represents the main model of the young carers app
 */

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