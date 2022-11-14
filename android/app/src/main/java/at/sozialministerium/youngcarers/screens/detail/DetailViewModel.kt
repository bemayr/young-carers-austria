package at.sozialministerium.youngcarers.screens.detail

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import at.sozialministerium.youngcarers.data.api.models.Abc
import at.sozialministerium.youngcarers.data.store.DataRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.launch

/**
 * Detail view model
 */

class DetailViewModel(
    private val repository: DataRepository
) : ViewModel() {

    val articles = MutableStateFlow<List<Abc>>(emptyList())

    init {
        viewModelScope.launch {
            repository.loadContent()?.let {
                articles.emit(it.abc)
            }
        }
    }

}