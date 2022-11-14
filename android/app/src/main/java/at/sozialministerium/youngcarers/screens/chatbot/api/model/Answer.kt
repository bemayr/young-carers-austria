package at.sozialministerium.youngcarers.screens.chatbot.api.model

import at.sozialministerium.youngcarers.data.api.models.Reference
import com.google.gson.annotations.SerializedName

data class Result (
    @SerializedName("type")
    val type: String,
    @SerializedName("id")
    val id: String,
    @SerializedName("reference")
    val reference: Reference?
)

data class Answer (
    @SerializedName("type")
    val type: String,
    @SerializedName("messages")
    val messages: List<String>,
    @SerializedName("results")
    val results: List<Result>?
)