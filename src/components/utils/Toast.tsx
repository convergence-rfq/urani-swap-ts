interface ToastProps {
  message: string;
  type?: 'error' | 'success';
  txId?: string;
}

export default function Toast({ message, type = 'error', txId }: ToastProps) {
  const bgColor = 'bg-[#1c1c1c]';
  const textColor = type === 'error' ? 'text-red-500' : 'text-white';
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`${bgColor} ${textColor} px-6 py-4 rounded-lg text-sm shadow-lg border border-[#202629] backdrop-blur-md`}>
        <div className="flex flex-col gap-2">
          {type === 'success' && (
            <>
              <h3 className="text-lg font-semibold">Transaction Confirmed</h3>
              <p className="text-white/50">{message}</p>
              {txId && (
                <a 
                  href={`https://solscan.io/tx/${txId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#4FB4DE] hover:underline mt-2"
                >
                  <span className="material-symbols-rounded text-sm">check_circle</span>
                  View transaction
                </a>
              )}
            </>
          )}
          {type === 'error' && (
            <p>{message}</p>
          )}
        </div>
      </div>
    </div>
  );
} 