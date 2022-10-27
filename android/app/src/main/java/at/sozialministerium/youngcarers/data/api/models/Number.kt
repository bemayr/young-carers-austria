package at.sozialministerium.youngcarers.data.api.models

import com.google.gson.annotations.SerializedName

data class Number(
    @SerializedName("label")
    val label: String,
    @SerializedName("number")
    val number: Int
)