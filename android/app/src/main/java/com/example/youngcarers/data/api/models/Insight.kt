package com.example.youngcarers.data.api.models


import com.google.gson.annotations.SerializedName

/**
 * @param content List of content in insights
 * @param question String of a question
 *
 * Represents the entry in insights
 */

data class Insight(
    @SerializedName("content")
    val content: List<Content>,
    @SerializedName("question")
    val question: String
)