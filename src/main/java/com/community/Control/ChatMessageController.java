package com.community.Control;

import com.community.Dto.ChatMessageDto;
import com.community.Entity.ChatMessage;
import com.community.Service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

@Controller
@RequestMapping("/chatroom")
@RequiredArgsConstructor
public class ChatMessageController {

    private final ChatMessageService chatMessageService;

    // 메시지 전송 기능
    @PostMapping("/{chatRoomId}/message")
    public String sendMessage(@PathVariable Long chatRoomId, @RequestParam String message) {
        chatMessageService.saveMessage(chatRoomId, message);
        return "redirect:/chatroom/" + chatRoomId;
    }

    // 메시지 리스트 조회 기능
    @GetMapping("/{chatRoomId}/messages")
    public String getMessages(@PathVariable Long chatRoomId, Model model) {
        List<ChatMessageDto> messages = chatMessageService.getMessages(chatRoomId);
        model.addAttribute("messages", messages);
        return "chatroom/messages";
    }

    // 채팅방 상세 페이지 조회 기능
    @GetMapping("/{chatRoomId}/view")
    public String chatRoom(@PathVariable Long chatRoomId, Model model) {
        List<ChatMessageDto> messages = chatMessageService.getMessages(chatRoomId);
        model.addAttribute("messages", messages);
        model.addAttribute("chatRoomId", chatRoomId);
        return "chatroom/chatRoom";
    }

}
