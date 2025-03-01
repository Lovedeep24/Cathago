async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const creditDisplay = document.getElementById('creditDisplay');
    
    if (!fileInput.files.length) {
        alert('Please select a file to upload.');
        return;
    }
    
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    try {
        const response = await fetch('http://localhost:5000/api/upload',{
            method: 'POST',
            body: formData
        });
            
        const result = await response.json();
        if (response.ok) {
            alert('File uploaded successfully!');
            // Deduct one credit after successful upload
            let currentCredits = parseInt(creditDisplay.textContent.split(': ')[1]);
            creditDisplay.textContent = `Credits: ${currentCredits - 1}`;
        } else {
            alert(`Upload failed: ${result.message}`);
        }
    } catch (error) {
        alert('Error uploading file. Please try again.');
        console.error(error);
    }
}
function requestMoreCredits(amount) {
    if (amount) {
        alert(`Requesting ${amount} more credits...`);
        // Implement backend request logic here
    }
}