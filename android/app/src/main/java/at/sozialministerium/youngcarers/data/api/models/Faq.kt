package at.sozialministerium.youngcarers.data.api.models

import com.google.gson.annotations.SerializedName

data class Faq(
    @SerializedName("answer")
    val answer: String,
    @SerializedName("question")
    val question: String,
    @SerializedName("showOnLandingPage")
    val showOnLandingPage: Boolean
)