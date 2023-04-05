package com.ssafy.voicescout.controller;

import com.ssafy.voicescout.dto.AiReqDto;
import com.ssafy.voicescout.dto.AiResDto;
import com.ssafy.voicescout.dto.InteractionDto;

import com.ssafy.voicescout.service.AiServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AiController {
  private final SimpMessagingTemplate simpMessagingTemplate;
  private final AiServiceImpl aiService;
  private static final String OUT_KEY = "get-out";
  private static final String UPDATE_KEY = "update-room";

  @MessageMapping("/ai")
  //@SendTo("topic") 구독자들에게 보내기
  public void sendAi(@RequestBody InteractionDto interactionDto, SimpMessageHeaderAccessor accessor) {
    log.info("[sendAi] : 메세시 수신 성공, message : {}, link : {}", interactionDto.getMessage(), interactionDto.getLink());
    AiReqDto aiReqDto = AiReqDto.builder()
        .msg(interactionDto.getMessage())
        .build();
    AiResDto aiResDto;
    if(OUT_KEY.equals(aiReqDto.getMsg())) {
      aiResDto = AiResDto.builder().prediction(2).build();
      log.info("[sendAi] : 방삭제 수신, prediction : {}", aiResDto.getPrediction());
    } else if(UPDATE_KEY.equals(aiReqDto.getMsg())){
      aiResDto = AiResDto.builder().prediction(3).build();
      log.info("[sendAi] : 방수정 수신, prediction : {}", aiResDto.getPrediction());
    } else {
      aiResDto = aiService.checkMessage(aiReqDto);
      log.info("[sendAi] : prediction 수신 성공, prediction : {}", aiResDto.getPrediction());
    }
    simpMessagingTemplate.convertAndSend("/ai/" + interactionDto.getLink(), aiResDto);
  }
}
