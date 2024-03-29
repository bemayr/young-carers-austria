package at.sozialministerium.youngcarers.data.api.models


import com.google.gson.annotations.SerializedName

/**
 * @param entries List of all entries in the abc list
 * @param information Information text of the entry
 * @param name Name of the entry
 * @param title Title of the entry
 *
 * Represents an entry in the abc list and the abc list itself
 */

data class Abc(
    @SerializedName("entries")
    val entries: List<Entry>,
    @SerializedName("id")
    val id: String,
    @SerializedName("information")
    val information: String,
    @SerializedName("name")
    val name: String,
    @SerializedName("title")
    val title: String
)