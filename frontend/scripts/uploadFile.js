document.getElementById("fileInput").addEventListener("change", handleFileChange);

async function handleFileChange() {

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const uploadBox = document.getElementById("uploadBox");

    if (file) {
        uploadBox.innerHTML = `${file.name}`;
    } 

    if (!file) {
        alert("Please select a file.");
        return;
    }

    if (file.type !== "text/plain") {
        alert("Only .txt files are allowed!");
        return;
    }
 
       
    }
  

async function scanFile(event) {
    debugger;
    try {
        event.preventDefault();

        const fileInput = document.getElementById("fileInput");
        const file = fileInput.files[0];
        if(!file)
        {
            alert("Please Select file");
        }
        const token = localStorage.getItem("token"); 
        const userId = localStorage.getItem("userId");
        console.log(token);
    //    const formData = new FormData();
    //    formData.append("file", file);
    const fileText = await file.text(); 
       console.log(file.name);
       const response = await fetch('http://localhost:3000/upload',{
           method:"POST",
           body:await fileText,
           headers: {
               "userId": userId,
               "file-name": file.name,
               "Authorization": `Bearer ${token}`
           }
       });
       console.log(response);
    const text = await response.text();
    console.log("Raw Response:", text);

    let data;
    try {
        data = JSON.parse(text);  // Manually parse JSON
        console.log("Parsed Data:", data);
    } catch (error) {
        console.error("JSON Parsing Error:", error);
    }
       if(response.status === 200)
       {
        //    console.log(data);
        alert("upload Successfull");
        }
        else{
            console.log('error in scanning');
        }
    } catch (error) {
        console.error("Error during scan:", error);
        alert("An error occurred, please try again.");
    }

    
}


// async function scanFile1(event) {
//     event.preventDefault();

//     const fileInput = document.getElementById("fileInput");
//     const file = fileInput.files[0];
//     const token = localStorage.getItem("token"); 
//     const userId = localStorage.getItem("userId");
//    const formData = new FormData();
//    formData.append("file", file);
//    console.log(file.name);
//    const response = await fetch('http://localhost:3000/upload',{
//        method:"POST",
//        body:formData,
//        headers: {
//            "userId": userId,
//            "file-name": file.name,
//            "Authorization": `Bearer ${token}`
//        }
//    });
//    const data = await response.json();
//    if(response.status === 200)
//    {
//        console.log(data);
       // localStorage.setItem("content", data.fileContent);
       // localStorage.setItem("docId", data._id);
         // const userId = localStorage.getItem("userId");
    // const token = localStorage.getItem("token"); 
    // const docId = localStorage.getItem("docId");
       // console.log("inside success");
       // // alert("File is uploaded!");
       // const newresponse = await fetch(`http://localhost:3000/match/?docId=${docId}`,{
       //     method:"POST",
       //     headers: {
       //         "Authorization": `Bearer ${token}`
       //     },
       //     body: JSON.stringify({ userId }) 
       // });
       // const newdata = await NEWresponse.json();
       // localStorage.setItem("matchPercent", newdata.maxMatch);
       // localStorage.setItem("matchContent", newdata.maxMatchContent);
       // localStorage.setItem("userContent", newdata.fileContent);
       // window.location.href = 'scan.html';
//    }
//    else{
//        alert("not uploaded");
//    }
// }
