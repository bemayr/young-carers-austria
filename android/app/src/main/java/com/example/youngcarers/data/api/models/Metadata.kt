package com.example.youngcarers.data.api.models


import com.google.gson.annotations.SerializedName

/**
 * @param content Content text of metadata entry
 * @param key key to assign metadata entry
 * @param title title of metadata entry
 *
 * Represents entry of metadata eg. for about screen
 */

data class Metadata(
    @SerializedName("content")
    val content: String,
    @SerializedName("key")
    val key: String,
    @SerializedName("title")
    val title: String
)