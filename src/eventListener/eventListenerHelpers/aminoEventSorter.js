
const events = {
    "0_0": "text_message",
    "0_100": "image_message",
    "0_103": "youtube_message",
    "1_0": "strike_message",
    "2_110": "voice_message",
    "3_113": "sticker_message",
    "52_0": "voice_chat_not_answered",
    "53_0": "voice_chat_not_cancelled",
    "54_0": "voice_chat_not_declined",
    "55_0": "video_chat_not_answered",
    "56_0": "video_chat_not_cancelled",
    "57_0": "video_chat_not_declined",
    "58_0": "avatar_chat_not_answered",
    "59_0": "avatar_chat_not_cancelled",
    "60_0": "avatar_chat_not_declined",
    "100_0": "delete_message",
    "101_0": "group_member_join",
    "102_0": "group_member_leave",
    "103_0": "chat_invite",
    "104_0": "chat_background_changed",
    "105_0": "chat_title_changed",
    "106_0": "chat_icchanged",
    "107_0": "voice_chat_start",
    "108_0": "video_chat_start",
    "109_0": "avatar_chat_start",
    "110_0": "voice_chat_end",
    "111_0": "video_chat_end",
    "112_0": "avatar_chat_end",
    "113_0": "chat_content_changed",
    "114_0": "screen_room_start",
    "115_0": "screen_room_end",
    "116_0": "chat_host_transfered",
    "117_0": "text_message_force_removed",
    "118_0": "chat_removed_message",
    "119_0": "text_message_removed_by_admin",
    "120_0": "chat_tip",
    "121_0": "chat_pin_announcement",
    "122_0": "voice_chat_permissiopen_to_everyone",
    "123_0": "voice_chat_permissiinvited_and_requested",
    "124_0": "voice_chat_permissiinvite_only",
    "125_0": "chat_view_only_enabled",
    "126_0": "chat_view_only_disabled",
    "127_0": "chat_unpin_announcement",
    "128_0": "chat_tipping_enabled",
    "129_0": "chat_tipping_disabled",
    "65281_0": "timestamp_message",
    "65282_0": "welcome_message",
    "65283_0": "invite_message"
}

export default function socketEventSorter(rawMessage){

    let messageType = rawMessage.chatMessage["type"];
    let messageMediaType = rawMessage.chatMessage["mediaType"];

    return events[`${messageType}_${messageMediaType}`];

}