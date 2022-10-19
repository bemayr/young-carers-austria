package at.sozialministerium.youngcarers.splashScreen

import androidx.compose.runtime.MutableState
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import at.sozialministerium.youngcarers.NavigationItem
import at.sozialministerium.youngcarers.Welcome
import at.sozialministerium.youngcarers.data.store.DataStoreRepository

import kotlinx.coroutines.launch
import javax.inject.Inject


class SplashViewModel @Inject constructor(
    private val repository: DataStoreRepository
) : ViewModel() {

    private val _isLoading: MutableState<Boolean> = mutableStateOf(true)
    val isLoading: State<Boolean> = _isLoading

    private val _startDestination: MutableState<String> = mutableStateOf(Welcome.Onboard.route)
    val startDestination: State<String> = _startDestination

    init {
        viewModelScope.launch {
            repository.readOnBoardingState().collect { completed ->
                if (completed) {
                    _startDestination.value = NavigationItem.Help.route
                } else {
                    _startDestination.value = Welcome.Onboard.route
                }
            }
            _isLoading.value = false
        }
    }

}