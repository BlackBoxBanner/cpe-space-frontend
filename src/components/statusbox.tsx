type StatusboxProps = {
  Icon: () => React.ReactNode;
  title: string;
  color: string;
};

const StatusBox = ({ Icon, title,color }: StatusboxProps) => {
  return (
    <>
      <div className="inset-0 flex items-center justify-center mt-12">
      <div className="text-center">
        <div className={`${color} h-9 w-9 text-white flex items-center justify-center text-xl rounded-full mx-auto mb-3`}>
          <Icon/>
        </div>
        <div className='text-xl'>{title}</div>
      </div>
    </div>
    </>
  );
};

export default StatusBox;
