package at.sozialministerium.youngcarers.data.store

import at.sozialministerium.youngcarers.data.api.models.YoungCarersModel
import at.sozialministerium.youngcarers.data.api.service.APIService
import at.sozialministerium.youngcarers.screens.chatbot.api.model.Answer
import at.sozialministerium.youngcarers.screens.chatbot.api.model.ChatBotModel
import at.sozialministerium.youngcarers.screens.chatbot.api.service.ChatBotAPI

/**
 * Interface for Data repository
 * Load content from Api
 */

interface DataRepository {
    suspend fun loadContent(): YoungCarersModel?
    suspend fun loadChatBotContent(): ChatBotModel?
    suspend fun getChatBotAnswer(message: String): Answer?
}

class DataRepositoryImpl(private val apiService: APIService, private val apiChatBotService: ChatBotAPI) : DataRepository {

    override suspend fun loadContent(): YoungCarersModel? {
        return apiService
            .getContent()
            .body()
    }
    override suspend fun loadChatBotContent(): ChatBotModel? {
        val character = apiChatBotService.getCharacter().body()
        val welcomeMessages = apiChatBotService.getWelcomeMessages().body()
        return ChatBotModel(
            character!!,
            welcomeMessages!!
        )
    }
    override suspend fun getChatBotAnswer(message: String): Answer? {
        return apiChatBotService
            .getAnswer(message)
            .body()
    }
}
