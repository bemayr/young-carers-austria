package at.sozialministerium.youngcarers.data.api.service

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import at.sozialministerium.youngcarers.data.api.models.YoungCarersModel
import kotlinx.coroutines.launch

class MainViewModel:  ViewModel() {

    //ToDo: cache for speed data loading, data integrated in the build

    var content: YoungCarersModel? by mutableStateOf(null);

    var errorMessage: String by mutableStateOf("")
    fun loadContent() {
        viewModelScope.launch {
            val apiService = APIService.getInstance()
            try {
                content = apiService
                    .getContent()
                    .body()
            }
            catch (e: Exception) {
                errorMessage = e.message.toString()
            }
        }
    }
}