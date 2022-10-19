package at.sozialministerium.youngcarers.screens.emergency

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import at.sozialministerium.youngcarers.DataRepository
import at.sozialministerium.youngcarers.data.api.models.Emergency
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.launch

/**
 * Emergency view model
 */

class EmergencyViewModel(
    private val repository: DataRepository
) : ViewModel() {

    val emergency = MutableStateFlow<Emergency?>(null)

    init {
        viewModelScope.launch {
            repository.loadContent()?.let {
                emergency.emit(it.emergency)
            }
        }
    }

}