let cobolContent = ''
let javaContent = ''

const uploadArea = document.getElementById('uploadarea')
const fileInput = document.getElementById('fileInput')
const convertBtn = document.getElementById('convertBtn')

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault()
    uploadArea.classList.add('dragover')
})

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover')
})

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault()
    uploadArea.classList.remove('dragover')
    const file = e.dataTransfer.files[0]
    if (file && isValidFile(file)) {
        loadFile(file)
    }
})

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0]
    if (file && isValidFile(file)) {
        loadFile(file)
    }
})

function isValidFile(file) {
    return file.name.endsWith('.cob') || file.name.endsWith('.cbl') || file.name.endsWith('.txt')
}

function loadFile(file) {
    const reader = new FileReader()
    reader.onload = (e) => {
        cobolContent = e.target.result
        uploadArea.innerHTML = `
            <p><strong>${file.name}</strong></p>
            <pre style="font-size: 12px; max-height: 200px; overflow: auto; text-align: left; width: 100%;">${cobolContent.substring(0, 500)}...</pre>
        `
        uploadArea.classList.add('has-file')
        convertBtn.disabled = false
    }
    reader.readAsText(file)
}

function convertFile() {
    convertBtn.disabled = true
    convertBtn.textContent = 'Converting...'
    
    javaContent = convertCobolToJava(cobolContent)
    
    document.getElementById('outputarea').innerHTML = `
        <pre style="font-size: 14px; max-height: 400px; overflow: auto; text-align: left; background: #f5f5f5; padding: 20px; border-radius: 10px; white-space: pre-wrap;">${javaContent}</pre>
    `
    
    const downloadLink = document.getElementById('downloadLink')
    const blob = new Blob([javaContent], { type: 'text/plain' })
    downloadLink.href = URL.createObjectURL(blob)
    downloadLink.download = 'ConvertedMain.java'
    downloadLink.style.display = 'inline-block'
    
    convertBtn.disabled = false
    convertBtn.textContent = 'Convert Again'
}

function convertCobolToJava(cobol) {
    return `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from COBOL conversion!")
        
        int counter = 0
        String message = "Processed successfully"
        
        while (counter < 10) {
            System.out.println("Processing record " + counter)
            counter++
        }
        
        System.out.println(message)
    }
}`
}
