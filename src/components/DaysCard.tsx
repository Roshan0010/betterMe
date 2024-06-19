import facewash from "../assets/facewash.png"

enum theme {
  green,
  red,
  grey

}

type Props = {
    index: number,
    id:string|null,
    date:string,
    size:number,
    theme:theme
  };
  
 

const DaysCard = (props: Props) => {

  // useEffect(() => {
   
  //   const fetch
  // }, [])
  console.log(props.theme)
    // 434849
    // 5A5A5A

    const subtitile=props.theme==theme.green?"uploadeed jorney sucessfully":props.theme==theme.red?"Missed to upload your jorney":
  "cvb"
  return (
    <div className={`sm:w-[80%] xxs:w-full xxs:
        h-[7rem] sm:h-[10rem] smd:h-[13rem] ${ props.theme === theme.red ? "bg-gradient-to-l from-[#FF4C4C] to-[#990000]" : 
    props.theme === theme.green ? "bg-gradient-to-l from-[#00FF00] to-[#006400]" : 
    "bg-gradient-to-l from-[#434849] to-[#2E2E2E]" } flex justify-between rounded-xl cursor-pointer 
        `} >
            {/* onClick={()=>navigate(`/dashboard/${props.data.route}`)} */}
          <div className=' md:w-[70%] sm:w-[50%] xxs:w-[40%]  text-white relative '>
            <p className='lgx:text-6xl lg:text-5xl md:text-4xl sm:text-2xl text-2xl ml-4 mt-5'>
             Day {props.size-(props.index)}
            </p>
            <p  className='lgx:text-3xl lg:text-2xl xxs:opacity-0 smd:opacity-75   md:text-xl  ml-4 mt-9'>
              {subtitile}
            </p>
            
    
    
          </div>
        <img src={facewash} alt="hi" className="sm:w-[50%] xxs:w-[60%]  smd:w-[30%] h-full opacity-30 object-contain" />
      </div>
  )
}

export default DaysCard