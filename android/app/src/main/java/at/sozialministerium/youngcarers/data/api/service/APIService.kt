package at.sozialministerium.youngcarers.data.api.service

import at.sozialministerium.youngcarers.data.api.models.YoungCarersModel
import okhttp3.OkHttpClient
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import java.util.concurrent.TimeUnit


/**
 * Retrofit api service to get the content from the backend
 */

interface APIService {

    @GET("api/content.json")
    suspend fun getContent(): Response<YoungCarersModel>


    companion object {
        var apiService: APIService? = null
        fun getInstance() : APIService {
 ;
            if (apiService == null) {
                apiService = Retrofit.Builder()
                    .baseUrl("https://bemayr.github.io/young-carers-austria/")
                    .client(client().build())
                    .addConverterFactory(GsonConverterFactory.create())
                    .build().create(APIService::class.java)
            }
            return apiService!!
        }
    }

}

fun client (): OkHttpClient.Builder {
    val httpClient: OkHttpClient.Builder = OkHttpClient.Builder()
        .callTimeout(2, TimeUnit.MINUTES)
        .connectTimeout(20, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .writeTimeout(30, TimeUnit.SECONDS)
    return httpClient
}
