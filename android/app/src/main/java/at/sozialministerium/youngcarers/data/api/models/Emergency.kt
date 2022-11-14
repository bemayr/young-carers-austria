package at.sozialministerium.youngcarers.data.api.models

import com.google.gson.annotations.SerializedName

/**
 * model for emergency page
 */

data class Emergency(
    @SerializedName("content")
    val content: List<Content>,
    @SerializedName("description")
    val description: String,
    @SerializedName("numbers")
    val numbers: List<Number>,
    @SerializedName("state")
    val state: String,
    @SerializedName("title")
    val title: String
)