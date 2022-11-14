package at.sozialministerium.youngcarers.screens.chatbot.api.service

import at.sozialministerium.youngcarers.screens.chatbot.api.model.Answer
import at.sozialministerium.youngcarers.screens.chatbot.api.model.WelcomeMessages
import at.sozialministerium.youngcarers.screens.chatbot.api.model.Character
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Query

interface ChatBotAPI {

    @GET("character")
    suspend fun getCharacter(): Response<Character>

    @GET("welcome")
    suspend fun getWelcomeMessages(): Response<WelcomeMessages>

    @GET("answer")
    suspend fun getAnswer(@Query("message") message: String): Response<Answer>


    companion object {
        var apiChatBotService: ChatBotAPI? = null
        fun getBotInstance() : ChatBotAPI {
            if (apiChatBotService == null) {
                apiChatBotService = Retrofit.Builder()
                    .baseUrl("https://chatbot.young-carers-austria.at/")
                    .addConverterFactory(GsonConverterFactory.create())
                    .build().create(ChatBotAPI::class.java)
            }
            return apiChatBotService!!
        }
    }

}