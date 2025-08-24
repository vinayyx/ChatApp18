// ChatInputBar.jsx (same as pehle, bas wrapper class change kiya hai)
export  const ChatInputBar = React.memo(function ChatInputBar({
  message,
  setMessage,
  sendMessage,
  showEmoji,
  setShowEmoji,
}) {
  return (
    <div className="sticky bottom-0 w-full bg-white border-t p-2 z-10">
      {showEmoji && (
        <div className="absolute bottom-16 left-4 shadow-lg z-20">
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              setMessage((prev) => prev + emojiData.emoji);
              setShowEmoji(false);
            }}
          />
        </div>
      )}

      <div className="flex items-center h-10 w-full text-sm rounded-lg bg-white border border-gray-300 shadow-sm">
        <button
          type="button"
          className="h-full px-2 text-gray-700 hover:text-blue-600"
          onClick={() => setShowEmoji((prev) => !prev)}
        >
          😀
        </button>
        <input
          className="outline-none bg-transparent h-full w-full px-2 text-black text-sm"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          type="button"
          className="h-full w-12 flex items-center justify-center rounded-r-lg bg-black text-white hover:bg-gray-800 transition"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
});
