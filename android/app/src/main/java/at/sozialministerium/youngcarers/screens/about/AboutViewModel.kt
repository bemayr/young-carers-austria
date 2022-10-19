package at.sozialministerium.youngcarers.screens.about

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import at.sozialministerium.youngcarers.DataRepository
import at.sozialministerium.youngcarers.data.api.models.Metadata
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.launch

/**
 * About view model
 */

class AboutViewModel(
    private val repository: DataRepository
) : ViewModel() {

    val metadata = MutableStateFlow<List<Metadata>>(emptyList())
    val timestamp = MutableStateFlow<String>("")

    init {
        viewModelScope.launch {
            repository.loadContent()?.let {
                metadata.emit(it.metadata)
                timestamp.emit(it.timestamp)
            }
        }
    }

}