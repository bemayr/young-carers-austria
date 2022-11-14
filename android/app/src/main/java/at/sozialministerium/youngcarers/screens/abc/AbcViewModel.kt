package at.sozialministerium.youngcarers.screens.abc

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import at.sozialministerium.youngcarers.data.api.models.Abc
import at.sozialministerium.youngcarers.data.api.models.Infos
import at.sozialministerium.youngcarers.data.store.DataRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.launch

/**
 * Abc view model
 */

class AbcViewModel(
    private val repository: DataRepository
) : ViewModel() {

    val articles = MutableStateFlow<List<Abc>>(emptyList())
    val infos = MutableStateFlow<Infos?>(null)
    val description = MutableStateFlow<String>("")
    val title = MutableStateFlow<String>("")

    init {
        viewModelScope.launch {
            repository.loadContent()?.let {
                articles.emit(it.abc)
                infos.emit(it.infos)
                description.emit(it.infos.description)
                title.emit(it.infos.title)
            }
        }
    }
}

