package com.example.youngcarers.data.api.models


import com.google.gson.annotations.SerializedName

/**
 * @param ownerName String of ownerName
 * @param ownerUrl String of ownerUrl
 * @param references List of reference
 *
 * Represents an entry in eg. insights category
 */

data class Entry(
    @SerializedName("ownerName")
    val ownerName: String,
    @SerializedName("ownerUrl")
    val ownerUrl: String,
    @SerializedName("references")
    val references: List<Reference>
)