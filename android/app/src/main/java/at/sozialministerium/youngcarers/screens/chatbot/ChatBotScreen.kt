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
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.*
import androidx.compose.ui.text.font.FontWeight

import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import at.sozialministerium.youngcarers.R
import at.sozialministerium.youngcarers.core.chatBotNames
import at.sozialministerium.youngcarers.ui.theme.colorDarkRed
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.*

/**
 * Generate the ChatBot page
 */
val message = mutableStateOf("")
val BotChatBubbleShape = RoundedCornerShape(0.dp,8.dp,8.dp,8.dp)
val AutnorChatBubbleShape = RoundedCornerShape(8.dp,0.dp,8.dp,8.dp)

var message_dummy = mutableStateListOf<Message>(
    Message(
        text = "Willkommen! Bei Young Carers Austria.",
        recipient_id = "bot",
        isOut = false
    ),
    Message(
        text = "Ich bin ein intelligenter Chatbot.\nDer dir dabei hilft, deine Fragen zu gewissen Themen, schneller zu finden.",
        recipient_id = "bot",
        isOut = false
    ),
    Message(
        text = "Schreib mir einfach eine Nachricht und ich werde dir sofort antworten.",
        recipient_id = "bot",
        isOut = false
    ),
    )

@Composable
fun ChatBotScreen() {

    val _noteList = remember { MutableStateFlow(listOf<String>()) }

    val context = LocalContext.current

    val listState = rememberLazyListState()

    Column (modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        TopBarSection(
            username = chatBotNames().random(),
            profile= painterResource(id = R.drawable.ic_bot_icon),
            isOnline = true
        )
        ChatSection(Modifier.weight(1f), listState)
        MessageSection(listState)

    }
}


@Composable
fun TopBarSection(
    username: String,
    profile: Painter,
    isOnline: Boolean = false
){
    Card (
        modifier = Modifier
            .fillMaxWidth()
            .height(60.dp),
        backgroundColor = Color(0xFFFAFAFA),
        elevation = 4.dp
    ) {
        Row (
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ){
            androidx.compose.foundation.Image(painter = profile, contentDescription = null, modifier = Modifier
                .size(42.dp)
                .clip(
                    CircleShape
                ))
            Spacer(modifier = Modifier.width(8.dp))

            Column {
                Text(text = username, fontWeight = FontWeight.SemiBold)
                Text(text = if (isOnline) "Online" else "Offline",
                    fontSize = 12.sp)
            }
        }

    }
}

@Composable
fun ChatSection(
    modifier: Modifier = Modifier,
    listState: LazyListState,
){
    val simpleDataFormat = SimpleDateFormat("h:mm a", Locale.GERMANY)
    LazyColumn(
        state = listState,
        modifier = modifier
            .fillMaxSize()
            .padding(16.dp),
        //reverseLayout = true
    ){
        items(message_dummy) { chat ->
            MessageItem(
                messageText = chat.text,
                //time = simpleDataFormat.format(chat.time),
                isOut = chat.isOut
            )
            Spacer(modifier = Modifier.height(8.dp))
        }
    }
}

@Composable
fun MessageItem(
    messageText: String?,
    //time: String,
    isOut: Boolean
){
    Column(
        modifier = Modifier.fillMaxWidth(),
        horizontalAlignment = if (isOut) Alignment.End else Alignment.Start
    ){
        if (messageText != null){
            if(messageText != ""){
                Box(
                    modifier = Modifier
                        .background(
                            if (isOut) Color.Gray else at.sozialministerium.youngcarers.ui.theme.colorDarkRed,//Color(0xFF616161), MaterialTheme.colors.primary
                            shape = if (isOut) AutnorChatBubbleShape else BotChatBubbleShape
                        )
                        .padding(
                            top = 8.dp,
                            bottom = 8.dp,
                            start = 16.dp,
                            end = 16.dp
                        )

                ){
                    Text(text = messageText, color = Color.White)

                }
            }
        }
        // Text(text = time, fontSize = 12.sp, modifier = Modifier.padding(start = 8.dp))
    }
}



@Composable
fun MessageSection(
    listState: LazyListState

){
    val coroutineScope = rememberCoroutineScope()
    val context = LocalContext.current
    val isTopButtonVisible  = remember {
        derivedStateOf {
            listState.firstVisibleItemIndex > 0
        }
    }
    Card (
        modifier = Modifier
            .fillMaxWidth()
            .padding(bottom = 60.dp),
        backgroundColor = Color.White,
        elevation = 10.dp
    ) {
        OutlinedTextField(
            colors = TextFieldDefaults.outlinedTextFieldColors(
                focusedBorderColor = colorDarkRed,
                unfocusedBorderColor = colorDarkRed),
            placeholder = {
                //TextView
                TextView()
            },
            value = message.value,
            onValueChange = { value ->
                message.value = value //it
            },
            shape = RoundedCornerShape(25.dp),

            trailingIcon = {

                IconButton(onClick = {

                    message_dummy.add(Message(message.value, "user", true))

                    Toast.makeText(context, "press " + message.value, Toast.LENGTH_SHORT).show()

                    if(message.value == "test"){
                        message_dummy.add(Message("Oh cooler Test", "bot", false))
                    }

                    message.value = ""

                    //follow messages to bottom
                    coroutineScope.launch {

                        listState.animateScrollToItem(message_dummy.size)

                    }

                }
                )
                {

                    Icon(
                        painter = painterResource(id = R.drawable.ic_send_f),
                        contentDescription = null,
                        tint = colorDarkRed,
                        modifier = Modifier
                            .size(50.dp)

                    )}
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