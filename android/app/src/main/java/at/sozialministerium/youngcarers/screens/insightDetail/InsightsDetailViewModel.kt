package at.sozialministerium.youngcarers.screens.insightDetail

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import at.sozialministerium.youngcarers.DataRepository
import at.sozialministerium.youngcarers.data.api.models.Insight
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.launch

/**
 * Insights detail model view
 */

class InsightsDetailViewModel(
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