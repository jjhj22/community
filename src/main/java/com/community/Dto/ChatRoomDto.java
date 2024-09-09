package com.community.Dto;

import com.community.Entity.ChatRoom;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.ui.Model;


@Getter
@Setter
public class ChatRoomDto {
    private Long id;         // 채팅방 ID
    private String title;    // 채팅방 제목
    private String creator;  // 채팅방 생성자 (이름)
    private String password; // 비밀번호 (삭제 시 사용

    private static ModelMapper modelMapper=new ModelMapper();

public ChatRoom createChatRoom() {
return modelMapper.map(this, ChatRoom.class);
}


    // Entity -> Dto
    public static ChatRoomDto of(ChatRoom chatRoom) {
        ChatRoomDto chatRoomdto = new ChatRoomDto();
        chatRoomdto.setId(chatRoom.getId());
        chatRoomdto.setTitle(chatRoom.getTitle());
        chatRoomdto.setCreator(chatRoom.getCreator());
        chatRoomdto.setPassword(chatRoom.getPassword());
        return chatRoomdto;
    }

    // Dto -> Entity
    public ChatRoom chatRoom(){
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setId(this.getId());
        chatRoom.setTitle(this.getTitle());
        chatRoom.setCreator(this.getCreator());
        chatRoom.setPassword(this.getPassword());
        return chatRoom;
    }
}



