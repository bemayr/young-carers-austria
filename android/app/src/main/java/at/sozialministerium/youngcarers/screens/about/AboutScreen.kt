package at.sozialministerium.youngcarers

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import at.sozialministerium.youngcarers.data.api.models.Metadata
import at.sozialministerium.youngcarers.screens.about.AboutViewModel
import org.koin.androidx.compose.getViewModel
import at.sozialministerium.youngcarers.R

/**
 * Generate the about page with title, body and metadata information
 */

@Composable
fun AboutScreen() {

    val viewModel = getViewModel<AboutViewModel>()
    val metadata: List<Metadata> by viewModel.metadata.collectAsState(initial = emptyList())
    val timestamp: String by viewModel.timestamp.collectAsState(initial = "")

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(colorResource(id = R.color.yc_background))
            .verticalScroll(rememberScrollState())
            .padding(bottom = 80.dp)

    ) {

        Text(
            stringResource(R.string.about_title),
            color = colorResource(id = R.color.yc_red_dark),
            fontSize = 35.sp,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(start = 20.dp, top = 60.dp)
        ) //TODO: backend api


        metadata.forEach { part ->
            when (part.key) {
                "imprint" -> txt(part.title, part.content, timestamp)
                "copyright" -> txt(part.title, part.content,timestamp)
                "accessibility" -> txt(part.title, part.content,timestamp)
                "gdpr" -> txt(part.title, part.content,timestamp)
            }

        }
    }
}

@Composable
fun SetLogos(timestamp: String){

    Image(painter = painterResource(id = R.drawable.ic_bmsgpk_light), contentDescription = "Logo Bundesministerium",
        modifier = Modifier.padding(start = 20.dp, end = 20.dp)
    )
    Row() {

        Image(painter = painterResource(id = R.drawable.ic_pflegende_angeh_rige), contentDescription = "Logo Plfegende Angehoerige",
            modifier = Modifier
                .padding(start = 20.dp)
                .size(160.dp)
        )
        Spacer(modifier = Modifier.weight(1f))
        Image(painter = painterResource(id = R.drawable.ic_fhooe__light), contentDescription = "Logo FH",
            modifier = Modifier.padding(end = 20.dp)
        )
    }
    Text(
        text = timestamp,
        modifier = Modifier.padding(start = 20.dp, end = 20.dp), textAlign = TextAlign.Center, color = Color.Black
    )

}

@Composable
fun txt(title: String, content: String, timestamp: String) {

    Text(
        text = title,
        color = colorResource(id = R.color.yc_red_dark),
        fontSize = 26.sp,
        modifier = Modifier.padding(start = 20.dp, top = 10.dp, end = 20.dp)
    )
    /*
    Text(
        text = content,
        modifier = Modifier.padding(start = 20.dp, end = 20.dp)
    )*/

    MarkdownText(markdown = content, modifier = Modifier.padding(start = 20.dp, end = 20.dp))

    if (title == "Impressum"){SetLogos(timestamp = timestamp)}

}
/*
@Preview(showBackground = true)
@Composable
fun AboutScreenPreview() {
    About_Screen()
}
*/

