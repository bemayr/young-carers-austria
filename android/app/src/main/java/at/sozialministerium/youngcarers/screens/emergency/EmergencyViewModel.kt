package at.sozialministerium.youngcarers.screens.emergency

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import at.sozialministerium.youngcarers.data.api.models.Content
import at.sozialministerium.youngcarers.data.api.models.Emergency
import at.sozialministerium.youngcarers.data.api.models.Number
import at.sozialministerium.youngcarers.data.store.DataRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.launch

/**
 * Emergency view model
 */

class EmergencyViewModel(
    private val repository: DataRepository
) : ViewModel() {

    val emergency = MutableStateFlow<Emergency?>(null)

    val numbers = MutableStateFlow<List<Number>>(emptyList())
    val content = MutableStateFlow<List<Content>>(emptyList())
    val description = MutableStateFlow<String>("")
    val title = MutableStateFlow<String>("")

    init {
        viewModelScope.launch {
            repository.loadContent()?.let {
                emergency.emit(it.emergency)
                numbers.emit(it.emergency.numbers)
                content.emit(it.emergency.content)
                description.emit(it.emergency.description)
                title.emit(it.emergency.title)
            }
        }
    }

}