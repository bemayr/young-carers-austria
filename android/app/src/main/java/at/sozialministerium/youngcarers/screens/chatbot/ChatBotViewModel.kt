package at.sozialministerium.youngcarers.screens.chatbot

import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.toMutableStateList
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import at.sozialministerium.youngcarers.data.store.DataRepository
import at.sozialministerium.youngcarers.screens.chatbot.api.model.Character
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.launch

/**
 * ChatBot view model
 */

class ChatBotViewModel (
    private val dataRepository: DataRepository
) : ViewModel() {

    val character = MutableStateFlow<Character?>(null)
    private val _messages = emptyList<Message>().toMutableStateList()
    val messages: List<Message>
        get() = _messages

    init {
        viewModelScope.launch {
            dataRepository.loadChatBotContent()?.let {
                character.emit(it.character)
                _messages.addAll(it.welcomeMessages.map { text ->
                    Message.Text(text, Author.Bot)
                })
            }
        }
    }
    fun sendMessage(message: String){
        // disable empty messages
        if (message.isNullOrEmpty()) return

        _messages.add(Message.Text(message,Author.User))
        viewModelScope.launch {
            val result = dataRepository.getChatBotAnswer(message)!!
            _messages.addAll(result.messages.map { text ->
                Message.Text(text, Author.Bot)
            })
            result.results?.let {  results ->
                _messages.addAll(results.filter {
                    message -> message.type == "reference"
                }.map { result ->
                    Message.Reference(result.reference!!, Author.Bot)
                })
            }
        }
    }
}