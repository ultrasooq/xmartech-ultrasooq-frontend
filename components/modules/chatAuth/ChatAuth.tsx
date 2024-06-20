"use client";

import useSocket from "@/app/hooks/useSocket ";

interface User {
  id: number;
}

interface ChatAuthProps {
  user: User;
}

const ChatAuth: React.FC<ChatAuthProps> = ({ user }) => {
  const { connected } = useSocket(user);

  return connected ? (
    ""
  ) : (
    ""
  );
};

export default ChatAuth;
