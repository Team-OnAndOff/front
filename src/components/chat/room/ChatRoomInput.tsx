import { MdOutlineSend } from 'react-icons/md'
import { ChatRoomSendButton } from '@/components/chat'

interface ChatRoomInputProps {
  message: string
  setMessage: (value: string) => void
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function ChatRoomInput({
  sendMessage,
  message,
  setMessage,
}: ChatRoomInputProps) {
  return (
    <div className='pt-4 mb-0 border-neutral-200 lg:mb-2 lg:mx-1'>
      <form className='relative flex' onSubmit={sendMessage}>
        <input
          type='text'
          placeholder='채팅 내용을 입력해주세요...'
          className='w-full py-3 pl-4 pr-20 bg-white rounded-md lg:pr-52 focus:outline-none focus:placeholder-main-dark-color text-neutral-600 placeholder-neutral-600 dark:text-dark-main-color dark:bg-dark-light-color smooth-color'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className='absolute inset-y-0 right-0 flex items-center'>
          <ChatRoomSendButton icon={MdOutlineSend} />
        </div>
      </form>
    </div>
  )
}
