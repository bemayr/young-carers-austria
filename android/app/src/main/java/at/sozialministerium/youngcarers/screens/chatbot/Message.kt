package at.sozialministerium.youngcarers.screens.chatbot

sealed class Author{
    object Bot: Author()
    object User: Author()
}

abstract sealed class Message(
    val author: Author
){
    class Text(val text: String, author: Author): Message(author)
    class Reference(val reference: at.sozialministerium.youngcarers.data.api.models.Reference, author: Author): Message(author)
}
