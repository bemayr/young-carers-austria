package com.example.youngcarers.data.api.models


import com.google.gson.annotations.SerializedName

/**
 * @param state State of the progress
 *
 * Not defined in the backend, still to be made
 */

data class Emergency(
    @SerializedName("state")
    val state: String
)