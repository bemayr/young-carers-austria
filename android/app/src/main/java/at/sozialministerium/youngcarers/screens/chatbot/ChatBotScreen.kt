package at.sozialministerium.youngcarers.screens.chatbot


import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListState
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.res.*
import androidx.compose.ui.text.font.FontWeight

import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import at.sozialministerium.youngcarers.MarkdownText
import at.sozialministerium.youngcarers.R
import at.sozialministerium.youngcarers.cards.AbcDetailSideCard
import at.sozialministerium.youngcarers.ui.theme.colorDarkRed
import com.google.accompanist.pager.ExperimentalPagerApi
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.launch
import org.koin.androidx.compose.getViewModel
import java.text.SimpleDateFormat
import java.util.*

/**
 * Generate the ChatBot page
 */
val BotBubbleShape = RoundedCornerShape(0.dp, 8.dp, 8.dp, 8.dp)
val UserBubbleShape = RoundedCornerShape(8.dp, 0.dp, 8.dp, 8.dp)
var messageCount = 0

@OptIn(ExperimentalPagerApi::class)
@Composable
fun ChatBotScreen(navController: NavHostController) {

    val listState = rememberLazyListState()
    val viewModel = getViewModel<ChatBotViewModel>()
    val character by viewModel.character.collectAsState()

    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        character?.let {
            TopBarSection(
                username = character!!.name,
                emoji = character!!.emoji,
                isOnline = true,
                navController = navController,
            )
        }
        ChatSection(viewModel, Modifier.weight(1f), listState)
        MessageSection(viewModel)
    }
}

@Composable
fun TopBarSection(
    username: String,
    emoji: String,
    isOnline: Boolean = false,
    navController: NavHostController,
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(60.dp),
        backgroundColor = Color(0xFFFAFAFA),
        elevation = 4.dp
    ) {
        Row(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = emoji,
                fontSize = 28.sp
            )
            Spacer(modifier = Modifier.width(8.dp))
            Column {
                Text(
                    text = username,
                    fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = if (isOnline) "Online" else "Offline",
                    fontSize = 12.sp
                )
            }
        }
        Row(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 8.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.End
        ) {
            IconButton(onClick = navController::navigateUp) {
                Icon(
                    imageVector = Icons.Default.Close,
                    tint = colorResource(id = R.color.yc_red_dark),
                    modifier = Modifier.size(40.dp),
                    contentDescription = "leave chatbot"
                )
                messageCount = 0
            }
        }
    }
}

@Composable
fun ChatSection(
    viewModel: ChatBotViewModel,
    modifier: Modifier = Modifier,
    listState: LazyListState,
) {
    val coroutineScope = rememberCoroutineScope()

    LazyColumn(
        state = listState,
        modifier = modifier
            .fillMaxSize()
            .background(colorResource(id = R.color.yc_background))
            .padding(16.dp),
    ) {
        items(viewModel.messages) { message ->
            MessageItem(message)
            Spacer(modifier = Modifier.height(8.dp))
            messageCount++
        }
        //follow messages to bottom
        coroutineScope.launch {
            listState.animateScrollToItem(messageCount)
        }
    }
}

@Composable
fun MessageItem(
    message: Message,
) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        horizontalAlignment = when (message.author) {
            is Author.Bot -> Alignment.Start
            is Author.User -> Alignment.End
        }
    ) {
        when (message) {
            is Message.Text ->
                Box(
                    modifier = Modifier
                        .background(
                            when (message.author) {
                                is Author.Bot -> Color.Gray
                                is Author.User -> colorDarkRed
                            },
                            shape = when (message.author) {
                                is Author.Bot -> BotBubbleShape
                                is Author.User -> UserBubbleShape
                            }
                        )
                        .padding(
                            top = 8.dp,
                            bottom = 8.dp,
                            start = 16.dp,
                            end = 16.dp
                        )
                ) {
                    MarkdownText(markdown = message.text, color = Color.White)
                }
            is Message.Reference -> AbcDetailSideCard(
                header = message.reference.title,
                description = message.reference.description,
                image = message.reference.previewImageUrl,
                url = message.reference.url,
                paidContent = message.reference.isPaidContent
            )
        }
    }
}

@OptIn(ExperimentalComposeUiApi::class)
@Composable
fun MessageSection(
    viewModel: ChatBotViewModel,
    ) {
    val focusManager = LocalFocusManager.current
    var message by remember { mutableStateOf("") }
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(bottom = 60.dp),
        backgroundColor = Color.White,
        elevation = 10.dp
    ) {
        OutlinedTextField(
            colors = TextFieldDefaults.outlinedTextFieldColors(
                focusedBorderColor = colorDarkRed,
                unfocusedBorderColor = colorDarkRed
            ),
            placeholder = {
                TextView()
            },
            value = message,
            onValueChange = { value ->
                message = value
            },
            shape = RoundedCornerShape(25.dp),
            trailingIcon = {
                IconButton(onClick = {
                    viewModel.sendMessage(message)
                    message = ""
                    //close keyboard after press send button
                    focusManager.clearFocus()
                })
                {
                    Icon(
                        painter = painterResource(id = R.drawable.ic_send_f),
                        contentDescription = null,
                        tint = colorDarkRed,
                        modifier = Modifier
                            .size(50.dp)
                    )
                }
            },
            modifier = Modifier
                .fillMaxWidth()
                .padding(10.dp),
        )
    }
}

@Composable
fun TextView() {
    Text(
        text = "Frag mich was"
    )
}