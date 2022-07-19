package com.example.youngcarers

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.compose.rememberNavController
import com.example.youngcarers.data.api.service.MainViewModel
import com.example.youngcarers.ui.theme.YoungCarersTheme

class MainActivity : ComponentActivity() {

    val mainViewModel by viewModels<MainViewModel>()


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MainScreen(mainViewModel)
        }
    }
}


@Composable
fun MainScreen(mainViewModel: MainViewModel) {
    val navController = rememberNavController()
    YoungCarersTheme {
        LaunchedEffect(key1 = Unit) {
            mainViewModel.loadContent()
        }

        Scaffold(
            bottomBar = { BottomNavigationBar(navController) }
        )
        {
            Navigation(navController = navController, mainViewModel)

        }
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    MainScreen(mainViewModel = MainViewModel())
}
