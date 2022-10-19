package at.sozialministerium.youngcarers.screens.chatbot

data class Message(
    var text: String?=null,
    var recipient_id: String,
    //var time: Long = Calendar.getInstance().timeInMillis,
    var isOut: Boolean = false
)

