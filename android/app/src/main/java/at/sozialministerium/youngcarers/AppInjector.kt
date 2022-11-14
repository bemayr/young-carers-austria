package at.sozialministerium.youngcarers

import at.sozialministerium.youngcarers.data.api.service.APIService
import at.sozialministerium.youngcarers.data.store.DataRepository
import at.sozialministerium.youngcarers.data.store.DataRepositoryImpl
import at.sozialministerium.youngcarers.screens.abc.AbcViewModel
import at.sozialministerium.youngcarers.screens.about.AboutViewModel
import at.sozialministerium.youngcarers.screens.chatbot.ChatBotViewModel
import at.sozialministerium.youngcarers.screens.chatbot.api.service.ChatBotAPI
import at.sozialministerium.youngcarers.screens.detail.DetailViewModel
import at.sozialministerium.youngcarers.screens.emergency.EmergencyViewModel
import at.sozialministerium.youngcarers.screens.help.HelpScreenViewModel
import at.sozialministerium.youngcarers.screens.insightDetail.InsightsDetailViewModel
import org.koin.androidx.viewmodel.dsl.viewModel
import org.koin.dsl.module

/**
 * App module with repository and view models
 */

val appModule = module {

    // single instance
    single<DataRepository> {
        DataRepositoryImpl(APIService.getInstance(), ChatBotAPI.getBotInstance())

    }

    // MyViewModel ViewModel
    viewModel { HelpScreenViewModel(get()) }
    viewModel { AbcViewModel(get()) }
    viewModel { AboutViewModel(get()) }
    viewModel { DetailViewModel(get()) }
    viewModel { EmergencyViewModel(get()) }
    viewModel { InsightsDetailViewModel(get()) }
    viewModel { ChatBotViewModel(get()) }

}
