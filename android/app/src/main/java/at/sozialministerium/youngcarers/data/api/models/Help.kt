package at.sozialministerium.youngcarers.data.api.models

import com.google.gson.annotations.SerializedName

data class Help(
    @SerializedName("description")
    val description: String,
    @SerializedName("title")
    val title: String
)