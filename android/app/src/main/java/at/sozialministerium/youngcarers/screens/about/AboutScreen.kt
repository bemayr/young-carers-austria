package at.sozialministerium.youngcarers.screens.about

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.CircularProgressIndicator
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
import org.koin.androidx.compose.getViewModel
import java.sql.Timestamp
import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.*
import at.sozialministerium.youngcarers.MarkdownText
import at.sozialministerium.youngcarers.data.api.models.Metadata
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
            .padding(bottom = 140.dp)
    ) {
        if (metadata.isEmpty()) {
            CircularProgressIndicator(color = colorResource(id = R.color.yc_red_dark))
        } else {
            Text(
                stringResource(R.string.about_title),
                color = colorResource(id = R.color.yc_red_dark),
                fontSize = 35.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(start = 20.dp, top = 60.dp)
            )
            metadata.forEach { part ->
                when (part.key) {
                    "imprint" -> SetPartText(part.title, part.content, timestamp)
                    "copyright" -> SetPartText(part.title, part.content, timestamp)
                    "accessibility" -> SetPartText(part.title, part.content, timestamp)
                    "gdpr" -> SetPartText(part.title, part.content, timestamp)
                }
            }
        }
    }
}

@Composable
fun SetImages(timestamp: String) {

    Image(
        painter = painterResource(id = R.drawable.ic_bmsgpk_light),
        contentDescription = "Logo Bundesministerium",
        modifier = Modifier.padding(start = 20.dp, end = 20.dp)
    )
    Row() {
        Image(
            painter = painterResource(id = R.drawable.ic_pflegende_angeh_rige),
            contentDescription = "Logo Plfegende Angehoerige",
            modifier = Modifier
                .padding(start = 20.dp)
                .size(160.dp)
        )
        Spacer(modifier = Modifier.weight(1f))
        Image(
            painter = painterResource(id = R.drawable.ic_fhooe__light),
            contentDescription = "Logo FH",
            modifier = Modifier.padding(end = 20.dp)
        )
    }

    val inputFormat: DateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSX", Locale.GERMANY)
    val date: Date = inputFormat.parse(timestamp)
    val diff: Long = Timestamp(System.currentTimeMillis()).getTime() - date.getTime()
    val days: Long = ((diff / 1000) / 86400)

    Text(
        text = "Letztes Update vor " + days + " Tagen",
        modifier = Modifier.padding(start = 20.dp, end = 20.dp),
        textAlign = TextAlign.Center,
        color = Color.Black
    )
}

@Composable
fun SetPartText(title: String, content: String, timestamp: String) {
    Text(
        text = title,
        color = colorResource(id = R.color.yc_red_dark),
        fontSize = 26.sp,
        modifier = Modifier.padding(start = 20.dp, top = 10.dp, end = 20.dp)
    )
    MarkdownText(
        markdown = content,
        modifier = Modifier.padding(start = 20.dp, end = 20.dp)
    )
    if (title == "Impressum") {
        SetImages(timestamp = timestamp)
    }
}

