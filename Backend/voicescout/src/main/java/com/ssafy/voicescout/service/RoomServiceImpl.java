package com.ssafy.voicescout.service;

import com.ssafy.voicescout.dto.RoomDto;
import com.ssafy.voicescout.entity.Room;
import com.ssafy.voicescout.repository.RoomRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

  private final RoomRepository roomRepository;

  @Override
  @Transactional
  public RoomDto createRoom(RoomDto roomReqDto) {
    Room room = Room.builder()
        .title(roomReqDto.getTitle())
        .link(roomReqDto.getLink())
        .password(roomReqDto.getPassword())
        .participant(roomReqDto.getParticipant())
        .typeId(roomReqDto.getTypeId())
        .locked(roomReqDto.isLocked())
        .build();
    Room createdRoom = roomRepository.save(room);
    roomReqDto.setSeq(createdRoom.getSeq());
    log.info("[createRoom] : 방 생성 완료, RoomSeq : {}", roomReqDto.getSeq());
    return roomReqDto;
  }

  @Override
  @Transactional
  public RoomDto updateRoom(RoomDto roomReqDto) {
    Room room = roomRepository.getById(roomReqDto.getSeq());
    room.updateRoom(roomReqDto);
    log.info("[createRoom] : 방 수정 완료, RoomSeq : {}", roomReqDto.getSeq());
    return roomReqDto;
  }

  @Override
  @Transactional
  public void deleteRoom(long roomSeq) {
    roomRepository.deleteById(roomSeq);
    log.info("[deleteRoom] : 방 삭제 완료, RoomSeq : {}", roomSeq);
  }

  @Override
  @Transactional(readOnly = true)
  public List<RoomDto> getRooms() {
    List<Room> rooms = roomRepository.findAll();
    List<RoomDto> roomsDto = new ArrayList<>();
    for (Room room : rooms) {
      RoomDto roomDto = RoomDto.builder()
          .seq(room.getSeq())
          .title(room.getTitle())
          .password(room.getPassword())
          .participant(room.getParticipant())
          .link(room.getLink())
          .locked(room.isLocked())
          .typeId(room.getTypeId())
          .build();
      roomsDto.add(roomDto);
    }
    log.info("[getRooms] : 방 목록 조회성공, 방 개수 : {}", roomsDto.size());
    return roomsDto;
  }

  @Override
  @Transactional(readOnly = true)
  public RoomDto getRoom(long roomSeq) {
    Room room = roomRepository.findById(roomSeq).get();
    RoomDto roomDto = RoomDto.builder()
        .seq(room.getSeq())
        .title(room.getTitle())
        .password(room.getPassword())
        .participant(room.getParticipant())
        .link(room.getLink())
        .locked(room.isLocked())
        .typeId(room.getTypeId())
        .build();
    log.info("[getRoom] : 방 조회성공, 방제 : {}", roomDto.getTitle());
    return roomDto;
  }
}
