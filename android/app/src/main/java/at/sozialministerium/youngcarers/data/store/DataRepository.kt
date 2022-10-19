package at.sozialministerium.youngcarers

import at.sozialministerium.youngcarers.data.api.models.YoungCarersModel
import at.sozialministerium.youngcarers.data.api.service.APIService

/**
 * Interface for Data repository
 * Load content from Api
 */

interface DataRepository {
    suspend fun loadContent(): YoungCarersModel?
}

class DataRepositoryImpl(private val apiService: APIService) : DataRepository {

    override suspend fun loadContent(): YoungCarersModel? {
        return apiService
            .getContent()
            .body()
    }

}