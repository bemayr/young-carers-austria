package at.sozialministerium.youngcarers.data.api.models

import com.google.gson.annotations.SerializedName

/**
 * model for emergency numbers
 */

data class Number(
    @SerializedName("label")
    val label: String,
    @SerializedName("number")
    val number: String
)