import { openUploadWidget } from "../../utils/CloudinaryService";

function formatDuration(durationInSeconds) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);
  const Duration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  return Duration;
}

const CloudinaryUpload = ({setUrl , setName , setDuration}) => {
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: "dhe5lvi4e",
        uploadPreset: "vahhgzbu",
        sources: ["local"]
      },
      function (error, result) {
        if (!error && result.event === "success") {
            setUrl(result.info.secure_url);
            // console.log(result.info);
            setName(result.info.original_filename);
            
            const Duration = formatDuration(result.info.duration);
            // console.log("Duration:", Duration);
            
            setDuration(Duration);
            // console.log(result.info);
        }
        else{
            if(error)
            {
                console.log(error);
            }
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button style={{backgroundColor:'white' , color:'black' , borderRadius :'50px' , marginTop:'2px', marginLeft:'20px'}} className="p-2" onClick={uploadImageWidget}>
      Select Track
    </button>
  );
};

export default CloudinaryUpload;
