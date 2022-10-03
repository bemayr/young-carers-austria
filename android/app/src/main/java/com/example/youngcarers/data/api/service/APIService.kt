package com.example.youngcarers.data.api.service

import com.example.youngcarers.data.api.models.YoungCarersModel
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET

interface APIService {

    @GET("api/content.json")
    suspend fun getContent(): Response<YoungCarersModel>

    companion object {
        var apiService: APIService? = null
        fun getInstance() : APIService {
            if (apiService == null) {
                apiService = Retrofit.Builder()
                    .baseUrl("https://bemayr.github.io/young-carers-austria/")
                    .addConverterFactory(GsonConverterFactory.create())
                    .build().create(APIService::class.java)
            }
            return apiService!!
        }
    }

}