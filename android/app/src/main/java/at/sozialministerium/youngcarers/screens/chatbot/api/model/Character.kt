package at.sozialministerium.youngcarers.screens.chatbot.api.model

import com.google.gson.annotations.SerializedName

data class Character(
    @SerializedName("emoji")
    val emoji: String,
    @SerializedName("name")
    val name: String
)
