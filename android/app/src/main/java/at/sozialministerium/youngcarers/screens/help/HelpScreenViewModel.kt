package at.sozialministerium.youngcarers.screens.help

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import at.sozialministerium.youngcarers.data.api.models.Faq
import at.sozialministerium.youngcarers.data.api.models.Help
import at.sozialministerium.youngcarers.data.api.models.Insight
import at.sozialministerium.youngcarers.data.store.DataRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.launch

/**
 * Help view model
 */

class HelpScreenViewModel(
    private val repository: DataRepository
) : ViewModel() {

    val insights = MutableStateFlow<List<Insight>>(emptyList())
    val faqs = MutableStateFlow<List<Faq>>(emptyList())
    val help = MutableStateFlow<Help?>(null)
    val description = MutableStateFlow<String>("")
    val title = MutableStateFlow<String>("")

    init {
        viewModelScope.launch {
            repository.loadContent()?.let {
                insights.emit(it.insights)
                faqs.emit(it.faqs)
                help.emit(it.help)
                description.emit(it.help.description)
                title.emit(it.help.title)



            }
        }
    }


}