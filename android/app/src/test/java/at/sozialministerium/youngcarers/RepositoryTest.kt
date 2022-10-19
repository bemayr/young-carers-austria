package at.sozialministerium.youngcarers

import at.sozialministerium.youngcarers.data.api.models.Abc
import at.sozialministerium.youngcarers.data.api.models.Emergency
import at.sozialministerium.youngcarers.data.api.models.YoungCarersModel
import at.sozialministerium.youngcarers.data.api.service.APIService
import kotlinx.coroutines.runBlocking
import org.junit.Test

import org.junit.Assert.*
import org.junit.Before
import org.koin.test.KoinTest
import org.mockito.Mock
import org.mockito.Mockito
import org.mockito.MockitoAnnotations
import retrofit2.Response
import java.util.*


class RepositoryTest: KoinTest {

    val model = YoungCarersModel(listOf<Abc>(), Emergency(""), listOf(), listOf(), Date().toString())

    lateinit var repository: DataRepository

    @Mock
    lateinit var apiService: APIService

    @Before
    fun setup()  {
        MockitoAnnotations.openMocks(this)
        repository = DataRepositoryImpl(apiService)
    }

    @Test
    fun `get all Data test`() {
        runBlocking {
            Mockito.`when`(apiService.getContent()).thenReturn(Response.success(model))
            val responseBody = repository.loadContent()
            assertEquals(model, responseBody)
        }
    }

    @Test
    fun `get no Data test`() {
        runBlocking {
            Mockito.`when`(apiService.getContent()).thenReturn(Response.success(null))
            val responseBody = repository.loadContent()
            assertNull(responseBody)
        }
    }

}