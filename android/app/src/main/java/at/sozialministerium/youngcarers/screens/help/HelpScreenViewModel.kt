package at.sozialministerium.youngcarers.screens.help

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import at.sozialministerium.youngcarers.DataRepository
import at.sozialministerium.youngcarers.data.api.models.Insight
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.launch

/**
 * Help view model
 */

class HelpScreenViewModel(
    private val repository: DataRepository
) : ViewModel() {

    val insights = MutableStateFlow<List<Insight>>(emptyList())

    init {
        viewModelScope.launch {
            repository.loadContent()?.let {
                insights.emit(it.insights)
            }
        }
    }


}