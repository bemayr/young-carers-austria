package at.sozialministerium.youngcarers.data.api.models

import com.google.gson.annotations.SerializedName

data class Infos(
    @SerializedName("title")
    val title: String,
    @SerializedName("description")
    val description: String
)