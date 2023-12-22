import {
  MdAttachFile,
  MdOutlineCameraAlt,
  MdInsertEmoticon,
  MdOutlineSend,
} from 'react-icons/md'
import { ChatRoomIcon, ChatRoomSendButton } from '@/components/chat'

export default function ChatRoomInput() {
  return (
    <div className='border-neutral-200 pt-4 mb-2 sm:mb-0'>
      <div className='relative flex'>
        <input
          type='text'
          placeholder='채팅 내용을 입력해주세요...'
          className='w-full focus:outline-none focus:placeholder-neutral-400 text-neutral-600 placeholder-neutral-600 pl-4 bg-neutral-200 rounded-md py-3'
        />
        <div className='absolute right-0 items-center inset-y-0 flex'>
          <div className='hidden sm:flex'>
            <ChatRoomIcon icon={MdAttachFile} onClick={() => {}} />
            <ChatRoomIcon icon={MdOutlineCameraAlt} onClick={() => {}} />
            <ChatRoomIcon icon={MdInsertEmoticon} onClick={() => {}} />
          </div>
          <ChatRoomSendButton icon={MdOutlineSend} onClick={() => {}} />
        </div>
      </div>
    </div>
  )
}
