interface UserMessageProps {
    content: string;
    timestamp: string;
  }
  
  const UserMessage = ({ content, timestamp }: UserMessageProps) => {
    return (
      <div className="mb-4 flex justify-end">
        <div className="max-w-4xl">
          <div className="flex flex-col items-end">
            <div className="text-body-regular text-text-primary bg-fill-secondary p-2 rounded-lg">
              {content}
            </div>
            <span className="text-sm text-text-secondary my-2 mx-2">
              {timestamp}
            </span>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserMessage;