package at.sozialministerium.youngcarers.data.api.models


import com.google.gson.annotations.SerializedName

/**
 * @param state State of the progress
 *
 * Not defined in the backend, still to be made
 */

data class Emergency(
    @SerializedName("content")
    val content: List<Content>,
    @SerializedName("numbers")
    val numbers: List<Number>,
    @SerializedName("state")
    val state: String
)