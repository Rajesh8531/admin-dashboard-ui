interface SeparatorOrProps {
  break? : boolean;
}
const Separator:React.FC<SeparatorOrProps> = (props) => {
  return (
    <div className='h-[1px] w-full flex justify-between items-center'>
        <div className='bg-neutral-200 h-full flex-1' />
        {props.break && (<p className="mx-3 text-sm text-neutral-500">or</p>)}
        <div className='bg-neutral-200 h-full flex-1' />
    </div>
  )
}

export default Separator