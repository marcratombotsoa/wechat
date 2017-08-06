package mg.wechat.model;

public class Message {

	private String channel;
	private String sender;
	private String content;
	
	public Message() {
		super();
	}

	public Message(String channel, String sender, String content) {
		super();
		this.channel = channel;
		this.sender = sender;
		this.content = content;
	}

	public String getChannel() {
		return channel;
	}

	public void setChannel(String channel) {
		this.channel = channel;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}
